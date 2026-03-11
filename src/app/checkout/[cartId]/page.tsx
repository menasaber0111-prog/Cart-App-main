import React from 'react'
import CheckoutForm from '../../_components/CheckoutForm/CheckoutForm'

export default async function ChekOut({params}:{params:{cartId:string}}) {
  const {cartId} = await params
  console.log(cartId);
  
  return (
    <CheckoutForm cartId= {cartId}></CheckoutForm>
  )
}
