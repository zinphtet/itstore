import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CartPageItem from './CartPageItem';
import { BsCartX } from 'react-icons/bs';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cartConAni, emptyCartAni, cartPageAni } from '../animation/animation';
import { loadStripe } from '@stripe/stripe-js';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
const CartPage = ({ clickToClose }) => {
	const { state, dispatch } = useContext(CartContext);
	const { user } = useUser();
	const router = useRouter();
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const purchaseHandle = async () => {
		// if(!user){
		//     toast('You first need to login to purchase items' , {icon:'🛢'})
		//      router.push('/api/auth/login')
		//      return ;
		//     }
		const stripe = await loadStripe(
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
		);
		const res = await fetch(`/api/checkout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(state.confirmItems),
		});
		const data = await res.json();
		await stripe.redirectToCheckout({
			sessionId: data.id,
		});
	};

	const totalPrice = useMemo(
		() =>
			state.confirmItems.reduce((prev, next) => {
				return prev + next.price * next.quantity;
			}, 0),
		[state.confirmItems]
	);
	return (
		<CardPageStyle
			variants={cartPageAni}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<AnimatePresence>
				<CartDetail
					layout
					variants={cartConAni}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					<AiOutlineCloseCircle className="close" onClick={clickToClose} />
					{state.confirmItems.length > 0 ? (
						<>
							{state.confirmItems.map((item, i) => (
								<CartPageItem key={item.slug} data={item} disFun={dispatch} />
							))}
							<motion.p className="total" layout>
								{' '}
								Subtotal : $ {totalPrice}
							</motion.p>
							<motion.button
								className="purchase"
								layout
								onClick={purchaseHandle}
							>
								Purchase
							</motion.button>
						</>
					) : (
						<motion.div className="no_items" variants={emptyCartAni}>
							<p>Your Cart is Empty</p>
							<BsCartX />
							<Link href={'/'}>
								<a>
									<button onClick={clickToClose}>Go Shopping</button>
								</a>
							</Link>
						</motion.div>
					)}
				</CartDetail>
			</AnimatePresence>
		</CardPageStyle>
	);
};

export default CartPage;

const CardPageStyle = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 10;
`;
const CartDetail = styled(motion.div)`
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 10rem 4rem;
	position: absolute;
	top: 0;
	right: 0;
	width: 40%;
	height: 100%;
	background-color: var(--bg-color);
	@media screen and (max-width: 56.25rem) {
		width: 55%;
	}
	@media screen and (max-width: 37.5rem) {
		width: 100%;
	}
	.no_items {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 20% 0;
		font-size: 2rem;
		gap: 2rem;
		svg {
			font-size: 3rem;
		}
		button {
			padding: 1rem;
			border: none;
			background-color: var(--primary-color);
			border-radius: none;
			cursor: pointer;
			color: #fff;
		}
	}
	.close {
		font-size: 3rem;
		position: absolute;
		top: 4rem;
		right: 4rem;
		cursor: pointer;
	}
	.total {
		font-size: 1.75rem;
	}
	.purchase {
		padding: 1rem;
		border-radius: none;
		cursor: pointer;
		border: none;
		background-color: var(--primary-color);
		color: #fff;
	}
`;
