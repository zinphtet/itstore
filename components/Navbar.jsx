import React, { useState } from 'react';
// import { NavbarStyle } from '../styles/styles'
import Image from 'next/image';
import styled from 'styled-components';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import CartPage from './CartPage';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { cartPageAni } from '../animation/animation';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
const Navbar = () => {
	const [showCartPage, setShowCartPage] = useState(false);
	const router = useRouter();
	const { state } = useContext(CartContext);

	const { user } = useUser();

	const total = state.confirmItems.reduce((prev, next) => {
		return prev + next.quantity;
	}, 0);

	return (
		<NavbarStyle>
			<AnimatePresence>
				{showCartPage && (
					<CartPage
						clickToClose={() => setShowCartPage(false)}
						layout
						variants={cartPageAni}
						initial="initial"
						animate="animate"
					/>
				)}
			</AnimatePresence>

			<p className="brand" onClick={() => router.push('/')}>
				IT Store
			</p>
			<div className="nav_right">
				<div
					className="profile"
					onClick={() => {
						if (user) {
							// router.push('/profile');  // implement Profile page
							return;
						}
						// router.push('/api/auth/login');
					}}
				>
					{user ? (
						<div
							style={{
								width: '3rem',
								height: '3rem',
								borderRadius: '50%',
								overflow: 'hidden',
							}}
						>
							<Image
								src={user?.picture}
								layout="responsive"
								width={'100'}
								height={'100'}
								alt="profile"
							/>
						</div>
					) : (
						<Link href="/api/auth/login">
							<a>
								<BiUserCircle />
							</a>
						</Link>
					)}

					<p className="profile_info">{user ? user?.name : 'login'}</p>
					{user && (
						<button className="logout_btn">
							<Link href="/api/auth/logout">
								<a>Logout</a>
							</Link>
						</button>
					)}
				</div>

				<div className="cart" onClick={() => setShowCartPage(true)}>
					<AiOutlineShoppingCart />
					<p>Cart</p>
					{state.confirmItems.length > 0 && <p className="num">{total}</p>}
				</div>
			</div>
		</NavbarStyle>
	);
};

export default Navbar;

const NavbarStyle = styled.div`
	color: var(--sec-color);
	display: flex;
	align-items: center;
	justify-content: space-between;
	.brand {
		font-size: 2.5rem;
		cursor: pointer;
		background-image: linear-gradient(to right, red, blue);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.nav_right {
		display: flex;
		gap: 4rem;
		& > * {
			display: flex;
			align-items: center;
			flex-direction: column;
			cursor: pointer;
			svg {
				font-size: 3rem;
			}
			p {
				font-size: 1.2rem;
			}
		}
		.logout_btn {
			padding: 0.3rem 0.75rem;
			border: none;
			border-radius: none;
			background-color: var(--primary-color);
			color: #fff;
			cursor: pointer;
		}
		.cart {
			position: relative;
			/* border: 1px solid red; */
			.num {
				position: absolute;
				right: -20%;
				top: -10%;
				width: 2rem;
				height: 2rem;
				text-align: center;
				line-height: 2rem;
				background-color: red;
				border-radius: 50%;
				font-size: 1rem;
			}
		}
	}
`;
