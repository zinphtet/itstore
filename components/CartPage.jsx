import React , {useState,useEffect} from 'react'
import styled from 'styled-components'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import CartPageItem from './CartPageItem'
import {BsCartX} from 'react-icons/bs'
import Link from 'next/link'
Link
const CartPage = ({clickToClose}) => {
    const show = true;
    useEffect(()=>{
        document.body.style.overflow='hidden'
        return ()=>{
            document.body.style.overflow = 'auto'
        }
    },[])
  return (
    <CardPageStyle >
        <CartDetail >
            <AiOutlineCloseCircle className='close' onClick={clickToClose}/>
            <CartPageItem/>
            <CartPageItem/>
            <CartPageItem/>
            <CartPageItem/>
            <CartPageItem/>
            <p className="total"> Subtotal : $ 2,500</p>
             <button className='purchase'>Purchase</button>

             <div className='no_items'>
                <p>Your Cart is Empty</p>
                <BsCartX/>
                <Link href={'/'}>
                    <a >
                    <button onClick={clickToClose}>Go Shopping</button>
                    </a>
                </Link>
               
             </div>
        </CartDetail>
    </CardPageStyle>
  )
}

export default CartPage

const CardPageStyle = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
    z-index: 10;
`
const CartDetail = styled.div`
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
    @media screen and (max-width : 56.25rem){
        width: 55%;
    }
    @media screen and (max-width : 37.5rem){
        width: 100%;
    }
    .no_items{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20% 0;
        font-size: 2rem;
        gap: 2rem;
        svg{
            font-size: 3rem;
        }
        button{
            padding: 1rem;
            border: none;
            background-color: var(--primary-color);
            border-radius: none;
            cursor: pointer;
            color: #fff;
        }
    }
    .close{
        font-size: 3rem;
        position: absolute;
        top: 4rem;
        right: 4rem;
        cursor: pointer;
    }
    .total{
        font-size: 1.75rem;
    }
    .purchase{
        padding:1rem;
        border-radius: none;
        cursor: pointer;
        border: none;
        background-color: var(--primary-color);
        color: #fff;
    }
`