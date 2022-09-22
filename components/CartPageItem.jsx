import React , {useState} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
// import img from './iphone.jpg'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { TO_CART_ADD , TO_CART_REMOVE } from '../Context/actions';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import { cartAni } from '../animation/animation';

const CartPageItem = ({data , disFun}) => {
    const {img , price , title , quantity }  = data

    const cartAdded = ()=>{
        
        disFun({type:TO_CART_ADD , payload : data})
        toast.success("Added To Cart")
    }
    const cartRemoved = ()=>{
        disFun({type : TO_CART_REMOVE , payload :data})
        toast.success("Remove from cart")
    }
    // const [quantity , setQuantity] = useState(1)
  return (
    <CartItemStyle variants={cartAni} layout>
        <div className="img_container">
            <Image layout='fill' height='100' width='100' src={img.data.attributes.formats.small.url} alt='product pic' objectFit='cover' />
        </div>
        <div className='product_info'>
            <p className="title">{title}</p>
            <p className="price">$ {price * quantity || price}</p>
            <div className='quantity'>
              <AiFillMinusCircle onClick={cartRemoved} />
              <p className="quan"> {quantity || 1} </p>
              <AiFillPlusCircle onClick={cartAdded} />
            </div>
        </div>
    </CartItemStyle>
  )
}

export default CartPageItem

const CartItemStyle = styled(motion.div)`
/* border: 1px solid red; */
border-radius: 1rem;
    display: flex;
    gap: 4rem;
    padding: 2rem;
    height: 20rem;
    max-height: 15rem;
    background-color: #fff;
    &>*{
        flex: 1;
    }
    .img_container{
        /* display: block; */
        position: relative;
         max-width: 15rem;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
      
    }
    .product_info{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .title{
                 font-size: 1.75rem;
                 font-weight: 500;
            }
        .price{
            font-size: 1.35rem;
        }
        .quantity{
            display: flex;
            align-items: center;
            gap: 2rem;
            
            svg{
                font-size: 2.5rem;
                cursor: pointer;
            }
        }
    }
`