

import React  , { useEffect} from 'react'
import styled from 'styled-components'
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
const profile = () => {
    const {user } = useUser()
    const router = useRouter()

    useEffect(()=>{
        if(!user) router.push('/')
    },[])
  return (
    <ProfileStyle>
        <p>All Checkout Lists</p>
        <div className='checkout_lists'></div>
        <button onClick={()=>router.push('/api/auth/logout')}>Logout</button>

    </ProfileStyle>
  )
}

export default profile

const ProfileStyle = styled.div`
padding: 6rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    p{
        font-size: 2.5rem;
    }
    button{
        padding:1rem 2rem;
        align-self: stretch;
        border: none;
        border-radius: none;
        background-color: var(--primary-color);
        color : #fff;
        cursor: pointer;
    }

`