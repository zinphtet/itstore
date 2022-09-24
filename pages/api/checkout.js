const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const session = await stripe.checkout.sessions.create({
				line_items: req.body.map((item) => {
					return {
						price_data: {
							currency: 'usd',
							product_data: {
								name: item.title,
								images: [item.img.data.attributes.formats.thumbnail.url],
							},
							unit_amount: item.price * 100,
						},
						quantity: item.quantity,
						adjustable_quantity: {
							enabled: true,
							minimum: 1,
							maximum: 10,
						},
					};
				}),

				shipping_address_collection: {
					allowed_countries: ['US', 'CA', 'MM', 'DE', 'TH'],
				},
				shipping_options: [
					{
						shipping_rate: 'shr_1LkqWOIFxvhRqGrGDTn7bLx5',
					},
					{
						shipping_rate: 'shr_1LkqXtIFxvhRqGrG8dGiTPM8',
					},
					{
						shipping_rate: 'shr_1LkqYOIFxvhRqGrGceZijKmT',
					},
				],
				allow_promotion_codes: true,
				mode: 'payment',
				success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/`,
				// cancel_url: `/`,
			});
			// res.redirect(303, session.url);
			// console.log('It worked');
			res.status(200).json(session);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}
