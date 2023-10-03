import React from 'react'

import Header from './header'
import OrderBlock from './common/orderBlock'
import CartCards from './common/cartCards'

const Cart = () => {
  return (
    <div className="bg-white h-screen">
      <Header />
      <div className="flex flex-row">
        <CartCards />
        <div className="w-[35%] h-[70%] flex justify-center">
          <OrderBlock />
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {}

export default Cart