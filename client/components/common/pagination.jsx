import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { newPage } from '../../redux/reducers/goods'

const Pagination = () => {
  const dispatch = useDispatch()
  const goodsList = useSelector((store) => store.goods.listOfGoods)
  const goodsOnPage = useSelector((store) => store.goods.goodsOnPage)

  const paginate = (pageNumber) => {
    return dispatch(newPage(pageNumber))
  }
  return (
    <div>
      <ul className="flex justify-center items-end m-1">
        {Array.from({ length: Math.ceil(goodsList.length / goodsOnPage) }).map((_, index) => (
          <li key={index} className="mx-1">
            <button type="button" onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

Pagination.propTypes = {}

export default Pagination