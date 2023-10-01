const GET_GOODS = 'ecommerce/goods/GET_GOODS'
const NEW_PAGE = 'ecommerce/goods/NEW_PAGE'

const initialState = {
  listOfGoods: [],
  currentPage: 1,
  goodsOnPage: 15
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GOODS: {
      return {
        ...state,
        listOfGoods: action.payload
      }
    }
    case NEW_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      }
    }
    default:
      return state
  }
}

export function getGoods() {
  return async (dispatch) => {
    const goodsUrl = '/api/v1/goods'
    const getProducts = await fetch(goodsUrl).then(data => data.json())
    return dispatch({ type: GET_GOODS, payload: getProducts })
  }
}

export function newPage(pageNumber) {
  return { type: NEW_PAGE, payload: pageNumber }
}