import React from "react"
import { Link } from "react-router-dom"
// import Cart from '../assets/svg/cart.svg'

const Header = () => {
  const items = 0
  return (
    <div className="w-full h-16 flex bg-gray-500">
      <div className="w-1/3 text-2xl font-sans font-bold flex justify-start items-center mx-4">
        <Link to="/">Shop</Link>
      </div>
      <div className="w-1/3">{false}</div>
      <div className="w-1/3 flex">
        <div className="w-4/5 flex justify-end items-center">
          <div className="flex mx-5">
            <button className="mx-2 font-sans font-medium" type="button">
              +/-
            </button>
            <button className="mx-2 font-sans font-medium" type="button">
              -/+
            </button>
            <button className="mx-2 font-sans font-medium" type="button">
              A-Z
            </button>
            <button className="mx-2 font-sans font-medium" type="button">
              Z-A
            </button>
          </div>
          <button className="mr-2 font-sans font-medium" type="button">
            USD
          </button>
          <button className="mx-1 font-sans font-medium border-x-2 border-solid w-14" type="button">
            EUR
          </button>
          <button className="mx-1 font-sans font-medium" type="button">
            CAD
          </button>
        </div>
        <div className="w-1/5 flex justify-center items-center font-sans font-bold">
          {items > 0 ? `Cart(${items})` : '<Cart />'}
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header