import React from "react"
import { Link, useLocation } from 'react-router-dom'
import SortButton from "./common/sortButton"
import CurrencyButton from "./common/currencyButton"
import CartButton from "./common/cartButton"
// import Cart from '../assets/svg/cart.svg'

const Header = () => {
  const location = useLocation()
  const currentUrl = location.pathname
  return (
    <div className="w-full h-16 flex bg-gray-500">
      <div className="w-1/3 text-2xl font-sans font-bold flex justify-start items-center mx-4">
        <Link to="/">Shop</Link>
      </div>
      <div className="w-1/3">{false}</div>
      <div className="w-1/3 flex">
        <div className="w-4/5 flex justify-end items-center">
          {currentUrl === '/' ? <SortButton /> : false}
          <CurrencyButton />
        </div>
          <CartButton />
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header