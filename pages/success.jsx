import React from 'react'
import styled from 'styled-components'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { useRouter } from 'next/router'

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
export async function getServerSideProps(context) {
    // console.log(context.query)

    // console.log(Object.keys(context.query)[0])
   const objKey = Object.keys(context.query)[0]
    // console.log(context.query[objKey])

    const session = await stripe.checkout.sessions.retrieve(context.query[objKey]);

    // console.log(session, 'session from success')
    return {
      props: {
        data : session
      }, // will be passed to the page component as props
    }
  }
const success = ({data}) => {
    const router = useRouter()
    // console.log(data)
  return (
    <Success>
        <div>
               <p>Thank for your support ! <span style={{color : 'green'}}> {data.customer_details.name} </span>😍</p>
               <div>
                <AiOutlineCheckCircle/>
               </div>
                <button onClick={()=>router.push('/')}>Go To Shopping </button>
        </div>
    </Success>
  )
}

export default success

const Success = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    gap: 2rem;
    /* border: 1px solid red; */
    height: 70vh;
    background-color: #fff;
    margin-block: 4rem;
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        p{
            font-size: 3rem;
            color: var(--primary-color);
        }
        svg{
            font-size: 4rem;
            color: green;
        }
        button{
            padding: 1rem 3rem;
            outline: none;
            background-color: var(--primary-color);
            color: #fff;
            cursor: pointer;
            border: none !important;
        }
    }
`





