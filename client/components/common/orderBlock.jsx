import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OrderBlock = () => {
  const { listOfCart, currency, rates } = useSelector((store) => store.goods)
  const totalSum = listOfCart
    .reduce((acc, obj) => {
      return acc + obj.price * rates[currency] * obj.quantity
    }, 0)
    .toFixed(2)
  const delivery = (5 * rates[currency]).toFixed(2)
  const totalCost = (+totalSum + +delivery).toFixed(2)
  return (
    <div className="w-[85%] h-[60%] border-4 border-solid bg-gray-100 m-6 rounded-lg flex flex-col justify-start items-center">
      <div className="border-b-4 border-solid border-white w-[80%] flex flex-col justify-center items-center">
        <div className="text-2xl font-sans font-bold mb-4 mt-20">
          Cost of goods {totalSum} {currency}
        </div>
        <div className="text-2xl font-sans font-bold pb-6">
          Cost of delivery {delivery} {currency}
        </div>
      </div>
      <div className="text-2xl font-sans font-bold mt-6">
        Total with delivery {totalCost} {currency}
      </div>
      <div className="mt-auto flex flex-col items-center pb-11">
        <button
          className="text-2xl font-sans font-bold border-4 border-solid bg-white rounded-lg px-3 my-5 w-auto"
          type="button"
        >
          Shipping and payment
        </button>
        <Link
          className="flex justify-center w-full text-2xl font-sans font-bold border-4 border-solid bg-white rounded-lg px-3"
          to="/"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  )
}

OrderBlock.propTypes = {}

export default OrderBlock
