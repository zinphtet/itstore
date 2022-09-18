import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import myImg from '../../components/iphone.jpg';
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
const ItemDetail = () => {
	const [quantity, setQuantity] = useState(1);
	return (
		<ItemDetailStyle>
			<div
				className="img_container"
				style={{ position: 'relative', width: '100%' }}
			>
				<Image
					src={myImg.src}
					alt="Item img"
					layout="responsive"
					height={3}
					width={4}
					objectFit="cover"
				/>
			</div>
			<div className="detail">
				<p className="title">i Phone 13 pro Max </p>
				<p className="description">
					Apple® today introduced iPhone® 13 Pro and iPhone 13 Pro Max, pushing
					the boundaries of what’s possible in a smartphone. Redesigned inside
					and out, both models introduce an all-new Super Retina XDR® display
					with ProMotion® featuring an adaptive refresh rate up to 120Hz, making
					the touch experience faster and more responsive.
				</p>
				<div className="quantity">
					<AiFillMinusCircle onClick={() => setQuantity((prev) => prev - 1)} />
					<p> {quantity} </p>
					<AiFillPlusCircle onClick={() => setQuantity((prev) => prev + 1)} />
				</div>
				<button className="add_btn">Add to Cart</button>
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
