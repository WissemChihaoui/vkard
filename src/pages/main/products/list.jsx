import React from 'react'
import ProductListView from '../../../sections/products/view/product-list-view'
import { useGetProducts } from '../../../actions/products'

export default function Page() {
    const {products} = useGetProducts()

    // const [data, setData] = useS:

    console.log(products)

  return (
    <ProductListView cards={products}/>
  )
}
