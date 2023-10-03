import React from "react";
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const CartButton = () => {
  const { listOfCart, currency, rates } = useSelector((store) => store.goods)
  const totalSum = listOfCart
    .reduce((acc, obj) => {
      return acc + obj.price * rates[currency] * obj.quantity
    }, 0)
    .toFixed(2)
  return (
    <Link to='/cart' className="w-1/5 flex justify-center items-center font-sans font-bold border-l-2 border-solid border-gray-400 px-4 mx-2">
      {totalSum > 0 ? `Cart(${totalSum})` : '<Cart />'}
    </Link>
  )
}

CartButton.propTypes = {}

export default CartButton