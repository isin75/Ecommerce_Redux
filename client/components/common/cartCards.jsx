import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart } from '../../redux/reducers/goods'

const CartCards = () => {
  const { listOfCart, currency, rates } = useSelector((store) => store.goods)
  const dispatch = useDispatch()

  const upCount = (id) => {
    const updatedCart = listOfCart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    return updatedCart
  }

  const downCount = (id) => {
    const updatedCart = listOfCart
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 }
        }
        return item
      })
      .filter((item) => item.quantity > 0)
    return updatedCart
  }

  const remove = (id) => {
    return listOfCart.filter((goods) => goods.id !== id)
  }

  const handleClickPlus = (id) => {
    dispatch(addToCart(upCount(id)))
  }

  const handleClickMinus = (id) => {
    dispatch(addToCart(downCount(id)))
  }

  const handleClickRemove = (id) => {
    dispatch(addToCart(remove(id)))
  }
  return (
    <div className="flex flex-col items-end w-[65%]">
      {listOfCart.map((goods) => (
        <div
          key={goods.id}
          className="w-[85%] h-16 border-4 border-solid m-6 rounded-lg flex flex-row bg-gray-100"
        >
          <div className="">
            <img
              className="card__price object-contain w-full h-full p-2 transition-transform transform scale-100 hover:scale-110"
              src={goods.image}
              alt={goods.title}
            />
          </div>
          <div className="flex flex-col justify-center w-2/5">
            <div className="card__title font-sans font-medium">{goods.title}</div>
            <div className="card__title font-sans">{goods.description}</div>
          </div>
          <div className="flex items-center w-1/5 font-sans font-bold">
            {(goods.price * rates[currency]).toFixed(2)} {currency}
          </div>
          <div className="w-2/5 flex items-center justify-center">
            <button
              type="button"
              className="pb-1 flex flex-row justify-center items-center w-6 h-6 border-4 border-solid bg-white mx-4 rounded-lg text-xl font-bold"
              onClick={() => handleClickMinus(goods.id)}
            >
              -
            </button>
            <span className="font-sans font-bold text-xl">{goods.quantity}</span>
            <button
              type="button"
              className="pb-1 flex flex-row justify-center items-center w-6 h-6 border-4 border-solid bg-white mx-4 rounded-lg text-xl font-bold"
              onClick={() => handleClickPlus(goods.id)}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="mx-2 font-sans font-bold"
            onClick={() => handleClickRemove(goods.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

CartCards.propTypes = {}

export default CartCards