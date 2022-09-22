import React ,{useState} from 'react'
// import { NavbarStyle } from '../styles/styles'
import Image from 'next/image'
import styled from 'styled-components'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {BiUserCircle} from 'react-icons/bi'
import CartPage from './CartPage'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import { cartPageAni } from '../animation/animation'
import { AnimatePresence } from 'framer-motion'
import { useAuth0 } from "@auth0/auth0-react";
const Navbar = () => {
    const [showCartPage ,setShowCartPage] =  useState(false)
    const router = useRouter()
    const {state} = useContext(CartContext)

    const { loginWithRedirect , logout , user, isAuthenticated, isLoading} = useAuth0();

    const total = state.confirmItems.reduce((prev,next)=>{
        return prev + next.quantity
    },0)

    // console.log(isAuthenticated , user)
  return (
    <NavbarStyle>
        <AnimatePresence>
        {
            showCartPage && <CartPage clickToClose ={()=>setShowCartPage(false)} layout variants={cartPageAni} initial='initial' animate ='animate'/>
        }
        </AnimatePresence>
       
        <p className="brand" onClick={()=>router.push('/')} >IT Store</p>
        <div className="nav_right">
            <div className="profile" onClick={()=>{
                 if(isAuthenticated) return
                loginWithRedirect()
                }}>
                {
                    isAuthenticated ? 
                    (
                        <div style={{width :'3.5rem' , height : '3.5rem' , borderRadius:'50%' , overflow:'hidden' , marginBottom:'.5rem'}}>

                            <Image src={user?.picture} layout='responsive' width={'100'} height={'100'} /> 
                        </div>
                    ):   <BiUserCircle/>
                }
             
                <p className="profile_info">{isAuthenticated ?user?.name :'login'}</p>
            </div>
                <button onClick={()=>logout({returnTo : 'http://localhost:3000'})}>Log out</button>
            <div className="cart" onClick={()=>setShowCartPage(true)}>
                <AiOutlineShoppingCart/>
                <p>Cart</p>
                <p className="num">{total}</p>
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
    cursor: pointer;
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
