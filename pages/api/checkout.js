const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		console.log(req.body);
		try {
			// Create Checkout Sessions from body params.
			const session = await stripe.checkout.sessions.create({
				line_items: req.body.map((item) => {
					return {
						price_data: {
							// The currency parameter determines which
							// payment methods are used in the Checkout Session.
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
				success_url: `${req.headers.origin}/success`,
				cancel_url: `${req.headers.origin}/canceled`,
				// cancel_url: `/`,
			});
			// res.redirect(303, session.url);
			res.status(200).json(session);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}

// Call your backend to create the Checkout Session
// fetch('/create-checkout-session', {
// 	method: 'POST',
//   })
//   .then(function(response) {
// 	return response.json();
//   })
//   .then(function(session) {
// 	return stripe.redirectToCheckout({ sessionId: session.id });
//   })
//   .then(function(result) {
// 	// If `redirectToCheckout` fails due to a browser or network
// 	// error, you should display the localized error message to your
// 	// customer using `error.message`.
// 	if (result.error) {
// 	  alert(result.error.message);
// 	}
//   });
