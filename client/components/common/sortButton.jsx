import React from "react";
import { useDispatch } from "react-redux";

import { filter } from "../../redux/reducers/goods"

const SortButton = () => {
  const dispatch = useDispatch()

  const toSort = (sortType, sortDirection) => {
    dispatch(filter(sortType, sortDirection))
  }
  return (
    <div className="flex mx-5">
      <button
        className="mx-2 font-sans font-medium"
        type="button"
        onClick={() => toSort('price', 'max')}
      >
        +/-
      </button>
      <button
        className="mx-2 font-sans font-medium"
        type="button"
        onClick={() => toSort('price', 'min')}
      >
        -/+
      </button>
      <button
        className="mx-2 font-sans font-medium"
        type="button"
        onClick={() => toSort('title', 'min')}
      >
        A-Z
      </button>
      <button
        className="mx-2 font-sans font-medium"
        type="button"
        onClick={() => toSort('title', 'max')}
      >
        Z-A
      </button>
    </div>
  )
}

SortButton.propTypes = {}

export default SortButton