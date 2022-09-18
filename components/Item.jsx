import React from 'react'
import styled from 'styled-components'
import myImg from './computer.jpg'
import Image from 'next/image'
import Link from 'next/link'
const Item = () => {
    // console.log(myImg)
  return (
    <Link href={'/detail/shop-item'}>
     <a >
    <ItemStyle>
        <div className='img_container'>
        <Image
      src={myImg.src}
      alt="Picture of the Shop Item"
      layout='responsive'
      objectFit='cover'
      height={3}
      width={4}
    />
        </div>
        <p className="item_title">Mac Book M2 Air</p>
        <p className="price"> $ 1,099</p>
    </ItemStyle>
    </a>
    </Link>
  )
}

export default Item


const ItemStyle = styled.div`
/* height: 50rem; */
cursor: pointer;
 /* border-radius: 2rem; */
.img_container{
    width: 100%;
    display: block;
    /* max-height: 25rem;
    min-height: 20rem; */
}
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem;
  background-color: #fff;
  div{
    position: relative;
  }
  .item_title{
    font-size: 1.75rem;
    font-weight: 400;
  }
  .price{
    font-size: 1.5rem;
  }
`