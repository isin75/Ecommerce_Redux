import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from './header'

const Cart = () => {
  const { listOfCart, currency, rates } = useSelector((store) => store.goods)
  const totalSum = listOfCart
    .reduce((acc, obj) => {
      return acc + obj.price * rates[currency] * obj.quantity
    }, 0)
    .toFixed(2)
  const delivery = (5 * rates[currency]).toFixed(2)
  const totalCost = (+totalSum + +delivery).toFixed(2)
  return (
    <div>
      <Header />
      <div className="flex flex-row">
        <div className="flex flex-col items-end bg-black w-[65%]">
          {listOfCart.map((goods) => (
            <div key={goods.id} className="w-[85%] h-16 bg-slate-600 m-6 rounded-lg flex flex-row">
              <div>
                <img
                  className="card__price object-contain w-full h-full p-2 transition-transform transform scale-100 hover:scale-110"
                  src={goods.image}
                  alt={goods.title}
                />
              </div>
              <div>
                <div className="card__title">{goods.title}</div>
                <div className="card__title">{goods.description}</div>
              </div>
              <div>
                {(goods.price * rates[currency]).toFixed(2)} {currency}
              </div>
              <div>{goods.quantity}</div>
            </div>
          ))}
        </div>
        <div className="bg-gray-400 w-[35%] h-screen flex justify-center">
          <div className="w-[85%] h-[60%] bg-gray-600 m-6 rounded-lg flex flex-col justify-center items-center">
            <div className='border-b border-solid'>
              <div>
                Cost of goods {totalSum} {currency}
              </div>
              <div>
                Cost of delivery {delivery} {currency}
              </div>
            </div>
            <div>
              Along with delivery {totalCost} {currency}
            </div>
            <button type="button">Shipping and payment</button>
            <Link to="/">Continue shopping</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {}

export default Cart