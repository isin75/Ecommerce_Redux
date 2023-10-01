import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getGoods } from '../../redux/reducers/goods'

const ProductCard = () => {
  const { listOfGoods, currentPage, goodsOnPage, loaded } = useSelector((store) => store.goods)
  const dispatch = useDispatch()

  const lastIndexOnPage = currentPage * goodsOnPage
  const firstIndexOnPage = lastIndexOnPage - goodsOnPage
  const currentGoods = listOfGoods.slice(firstIndexOnPage, lastIndexOnPage)

  useEffect(() => {
    if (!loaded) {
      dispatch(getGoods())
    }
    return () => {}
  }, [])
  return (
    <div className="flex flex-wrap justify-center">
      {currentGoods.map((goods) => (
        <div
          key={goods.id}
          className="card h-[350px] w-[255px] m-2 bg-white flex flex-col justify-center items-center border-4 border-solid"
        >
          <img className="card__price" src={goods.image} alt={goods.title} />
          <div className="card__title">{goods.title}</div>
          <div className="currency">{goods.price}</div>
          <div className="flex flex-col justify-center mt-auto">
            <div className="card__product-amount">goods in cart</div>
            <button className="border border-solid border-black mb-2" type="button">
              Add
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

ProductCard.propTypes = {}

export default ProductCard