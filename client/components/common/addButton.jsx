import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addToCart } from '../../redux/reducers/goods'

const AddButton = (props) => {
  const dispatch = useDispatch()
  const listOfCart = useSelector((store) => store.goods.listOfCart)
  const { goods } = props
  const addCart = () => {
    const { id } = goods
    const addNewItem = { ...goods, quantity: 1 }
    const isInList = listOfCart.some((item) => item.id === id)
    if (isInList) {
      const updatedCart = listOfCart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      })
      return updatedCart
    }
    return [...listOfCart, addNewItem]
  }
  const handleClickAdd = () => {
    dispatch(addToCart(addCart()))
  }
  return (
    <button
      className="border border-solid border-black mb-2 w-16"
      type="button"
      onClick={handleClickAdd}
    >
      Add
    </button>
  )
}

AddButton.propTypes = {}

export default AddButton
