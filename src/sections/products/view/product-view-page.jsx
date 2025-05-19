import React from 'react'
import ProductHeader from '../product-header'
import Benefits from '../Benefits'

export default function ProductViewPage({ card = {}}) {
  return (
    <>
        <ProductHeader card={card}/>
        <Benefits />
    </>
  )
}
