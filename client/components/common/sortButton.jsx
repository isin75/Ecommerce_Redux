import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { filter } from "../../redux/reducers/goods"

const SortButton = () => {
  const dispatch = useDispatch()
  const { sortPrice, sortTitle } = useSelector((store) => store.goods)
  const toSort = (sortType, sortDirection) => {
    dispatch(filter(sortType, sortDirection))
  }
  return (
    <div className="flex mx-5">
      {sortPrice === 'min' ? (
        <button
          className="mx-2 font-sans font-medium"
          type="button"
          onClick={() => toSort('price', 'max')}
        >
          To min price
        </button>
      ) : (
        <button
          className="mx-2 font-sans font-medium"
          type="button"
          onClick={() => toSort('price', 'min')}
        >
          To max price
        </button>
      )}{' '}
      {sortTitle === 'min' ? (
        <button
          className="mx-2 font-sans font-medium"
          type="button"
          onClick={() => toSort('title', 'max')}
        >
          Sort Z-A
        </button>
      ) : (
        <button
          className="mx-2 font-sans font-medium"
          type="button"
          onClick={() => toSort('title', 'min')}
        >
          Sort A-Z
        </button>
      )}
    </div>
  )
}

SortButton.propTypes = {}

export default SortButton