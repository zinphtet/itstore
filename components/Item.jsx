import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { cartAni } from '../animation/animation'
import { motion } from 'framer-motion'
const Item = ({data}) => {
  const {title , slug , img , price} = data.attributes
    // console.log(myImg)
  return (
    <Link href={`/detail/${slug}`}>
     <a >
    <ItemStyle variants={cartAni} >
        <div className='img_container'>
        <Image
      src={img?.data?.attributes?.formats?.small?.url}
      alt="Picture of the Shop Item"
      layout='responsive'
      objectFit='cover'
      height={3}
      width={4}
    />
        </div>
        <p className="item_title">{title}</p>
        <p className="price"> $ {price}</p>
    </ItemStyle>
    </a>
    </Link>
  )
}

export default Item


const ItemStyle = styled(motion.div)`
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