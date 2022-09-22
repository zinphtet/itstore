import React from 'react'
import styled from 'styled-components'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    console.log(context , 'from success page')
    return {
      props: {
        data : 'nothing'
      }, // will be passed to the page component as props
    }
  }
const success = () => {
    const router = useRouter()
  return (
    <Success>
        <div>
               <p>Thank for your support ! 😍</p>
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