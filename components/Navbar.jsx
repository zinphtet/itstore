import React ,{useState} from 'react'
// import { NavbarStyle } from '../styles/styles'
import styled from 'styled-components'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiUserCircle} from 'react-icons/bi'
import CartPage from './CartPage'
const Navbar = () => {
    const [showCartPage ,setShowCartPage] =  useState(false)
  return (
    <NavbarStyle>
        {
            showCartPage && <CartPage clickToClose ={()=>setShowCartPage(false)} />
        }
       
        <p className="brand">IT Store</p>
        <div className="nav_right">
            <div className="profile">
               <BiUserCircle/>
                <p className="profile_info">Login</p>
            </div>
            <div className="cart" onClick={()=>setShowCartPage(true)}>
                <AiOutlineShoppingCart/>
                <p>Cart</p>
                <p className="num">0</p>
            </div>
        </div>
    </NavbarStyle>
  )
}

export default Navbar

const NavbarStyle = styled.div`
   color : var(--sec-color);
   display: flex;
   align-items: center;
   justify-content: space-between;
   .brand{
    font-size: 3rem;
    /* background-image: linear-gradient(to right,red,blue);
     -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */

    @media screen and (max-width: 56.25rem ){
        color: red;
    }
    @media screen and (max-width: 37.5rem ){
     color: blue;
  }
    
   }
   .nav_right{
    display: flex;
    gap: 4rem;
    &>*{
        display: flex;
        align-items: center;
        flex-direction: column;
        cursor: pointer;
        svg{
            font-size: 3rem;
        }
       p{
            font-size: 1.5rem;
        }
    }
    .cart{
        position: relative;
        /* border: 1px solid red; */
        .num{
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
`
