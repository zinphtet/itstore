import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ITEM } from '../../lib/graphql';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { ADD_CART, REMOVE_CART, TO_CART } from '../../Context/actions';
import toast from 'react-hot-toast';
const ItemDetail = () => {
	// const [quantity, setQuantity] = useState(1);
	const router = useRouter();
	const slugId = router.query.slug;

	const { state, dispatch } = useContext(CartContext);

	const { data, loading, error } = useQuery(GET_ITEM, {
		variables: {
			slug: slugId,
		},
	});

	if (loading) return <div>Loading ... </div>;
	if (error) return <div>Error ... </div>;

	const { title, price, img, description, slug } =
		data.shops.data[0].attributes;

	const dataFromContext = state.cartItems.find((item) => item.slug === slugId);
	const quantity = dataFromContext?.quantity || 1;

	const totalPrice = quantity ? quantity * price : price;

	const addToCart = () =>
		dispatch({ type: ADD_CART, payload: { title, price, img, slug } });

	const removeFromCart = () =>
		dispatch({ type: REMOVE_CART, payload: { title, price, img, slug } });

	const confirmCart = () => {
		toast.success('Added to Cart');
		dispatch({ type: TO_CART, payload: { title, price, img, slug } });
	};

	console.log(state.confirmItems);
	return (
		<ItemDetailStyle>
			<div
				className="img_container"
				style={{ position: 'relative', width: '100%' }}
			>
				<Image
					src={img?.data?.attributes?.formats?.small?.url}
					alt="Item img"
					layout="responsive"
					height={3}
					width={4}
					objectFit="cover"
				/>
			</div>
			<div className="detail">
				<p className="title">{title} </p>
				<p className="description">{description}</p>
				<div className="quantity">
					<AiFillMinusCircle onClick={removeFromCart} />
					<p> {quantity} </p>
					<AiFillPlusCircle onClick={addToCart} />
					<p> $ {totalPrice}</p>
				</div>
				<button className="add_btn" onClick={confirmCart}>
					Add to Cart
				</button>
			</div>
		</ItemDetailStyle>
	);
};

export default ItemDetail;

const ItemDetailStyle = styled.div`
	padding: 4rem 0;
	display: flex;
	gap: 6%;
	color: var(--sec-color);

	& > * {
		flex: 1;
	}
	.img_container {
		/* img{
            align-items: stretch;
        } */
		display: block;
		/* margin: 0rem 10rem; */

		img {
			display: none;
		}
		@media screen and (max-width: 56.25rem) {
			padding: 4rem 6rem 0rem 6rem;
		}
	}
	.detail {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		.title {
			font-size: 2rem;
		}
		.description {
			font-size: 1.35rem;
		}
		.quantity {
			display: flex;
			gap: 1rem;
			align-items: center;
			font-size: 1.5rem;

			svg {
				font-size: 3rem;
				cursor: pointer;
			}
		}
		.add_btn {
			padding: 0.5rem;
			cursor: pointer;
			background-color: var(--primary-color);
			color: #fff;
			font-family: 'Poppins', sans-serif;
		}
	}
	@media screen and (max-width: 56.25rem) {
		flex-direction: column;
		gap: 4rem;
	}
`;
