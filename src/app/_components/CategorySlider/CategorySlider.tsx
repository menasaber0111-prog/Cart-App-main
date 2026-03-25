import { Category } from '../../../types/productItem'
import React from 'react'
import Slider from '../Slider/Slider'

export default async function CategorySlider() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
  const payload = await response.json()
  const categories:Category[] = payload.data
  return (
    
    <Slider categories={categories}></Slider>
  )
}
