import { ProductType } from '@customTypes/products'
import {useEffect, useState} from 'react'

import { getProducts } from 'services/productsService'


const Home = () => {
  const [products, setProducts] = useState<ProductType[] | ProductType>([])

  const loadProducts = async () => {
    try {
      const response =  await getProducts();
      setProducts(response?.payload ? response?.payload : [])
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <>
    <h1>HOME</h1>
    <div><h2>Products</h2></div>
    </>
  )
}

export default Home