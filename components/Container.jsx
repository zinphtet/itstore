import React from 'react'
import styled from 'styled-components'
import Item from './Item'
const Container = () => {
  return (
    <ShopContainer>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
      <Item/>
    </ShopContainer>
  )
}

export default Container


const ShopContainer = styled.div`
    padding: 4rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fill , minmax(25rem , 1fr));
    grid-gap: 2rem;
`