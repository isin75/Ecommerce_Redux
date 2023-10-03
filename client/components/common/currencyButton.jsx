import React from "react";
import { useDispatch } from "react-redux";

import { setCurrency } from '../../redux/reducers/goods'

const CurrencyButton = () => {
  const dispatch = useDispatch()

  const handleClickCurrency = (value) => {
    dispatch(setCurrency(value))
  }
  return (
    <>
      <button
        className="mr-2 font-sans font-medium"
        type="button"
        onClick={() => handleClickCurrency('USD')}
      >
        USD
      </button>
      <button
        className="mx-1 font-sans font-medium border-x-2 border-solid w-14"
        type="button"
        onClick={() => handleClickCurrency('EUR')}
      >
        EUR
      </button>
      <button
        className="mx-1 font-sans font-medium"
        type="button"
        onClick={() => handleClickCurrency('CAD')}
      >
        CAD
      </button>
    </>
  )
}

CurrencyButton.propTypes = {}

export default CurrencyButton