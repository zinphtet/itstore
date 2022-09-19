import React , {useState} from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import img from './iphone.jpg'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
const CartPageItem = () => {
    const [quantity , setQuantity] = useState(1)
  return (
    <CartItemStyle>
        <div className="img_container">
            <Image layout='fill' height='100' width='100' src={img.src} alt='product pic' objectFit='cover' />
        </div>
        <div className='product_info'>
            <p className="title">iPhone 13 pro Max</p>
            <p className="price">$ 1,200</p>
            <div className='quantity'>
              <AiFillMinusCircle onClick={()=>setQuantity(prev=>prev-1)} />
              <p className="quan"> {quantity} </p>
              <AiFillPlusCircle onClick={()=>setQuantity(prev=>prev+1)} />
            </div>
        </div>
    </CartItemStyle>
  )
}

export default CartPageItem

const CartItemStyle = styled.div`
/* border: 1px solid red; */
border-radius: 1rem;
    display: flex;
    gap: 4rem;
    padding: 2rem;
    height: 20rem;
    max-height: 20rem;
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