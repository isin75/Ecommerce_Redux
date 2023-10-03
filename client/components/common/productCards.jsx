import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getGoods, getCurrency } from '../../redux/reducers/goods'
import AddButton from "./addButton";

const ProductCard = () => {
  const { listOfGoods, currentPage, goodsOnPage, loaded, currency, rates } = useSelector(
    (store) => store.goods
  )
  const listOfCart = useSelector((store) => store.goods.listOfCart)
  const dispatch = useDispatch()

  const lastIndexOnPage = currentPage * goodsOnPage
  const firstIndexOnPage = lastIndexOnPage - goodsOnPage
  const currentGoods = listOfGoods.slice(firstIndexOnPage, lastIndexOnPage)

  useEffect(() => {
    if (!loaded) {
      dispatch(getGoods())
      dispatch(getCurrency())
    }
    return () => {}
  }, [])
  return (
    <div className="flex flex-wrap justify-center">
      {currentGoods.map((goods) => (
        <div
          key={goods.id}
          className="card h-[350px] w-[255px] m-2 bg-gray-100 flex flex-col justify-center items-center border-4 border-solid"
        >
          <img className="card__price" src={goods.image} alt={goods.title} />
          <div className="flex flex-col justify-center items-center mt-auto">
            <div className="card__title">{goods.title}</div>
            <div className="currency">
              {(goods.price * rates[currency]).toFixed(2)} {currency}
            </div>
            <div className="card__product-amount">
              {listOfCart.map((inCart) => (inCart.id === goods.id ? inCart.quantity : false))}
            </div>
            <AddButton goods={goods} />
          </div>
        </div>
      ))}
    </div>
  )
}

ProductCard.propTypes = {}

export default ProductCard