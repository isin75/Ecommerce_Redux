const GET_GOODS = 'ecommerce/goods/GET_GOODS'
const NEW_PAGE = 'ecommerce/goods/NEW_PAGE'
const FILTER = 'ecommerce/goods/FILTER'
const LOADED = 'ecommerce/goods/LOADED'
// const FILTER_Z_A = 'ecommerce/goods/FILTER_Z_A'
// const FILTER_MIN_MAX = 'ecommerce/goods/FILTER_MIN_MAX'
// const FILTER_MAX_MIN = 'ecommerce/goods/FILTER_MAX_MIN'

const initialState = {
  listOfGoods: [],
  currentPage: 1,
  goodsOnPage: 15,
  currency: 'USD',
  sort: {
    type: 'price',
    direction: 'min'
  },
  loaded: false
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
    case FILTER: {
      return {
        ...state,
        listOfGoods: action.payload,
        sort: {
          type: action.sortType,
          direction: action.sortDirection
        }
      }
    }
    case LOADED: {
      return {
        ...state,
        loaded: action.payload
      }
    }
    default:
      return state
  }
}

export function getGoods() {
      return (dispatch) => {
        const goodsUrl = '/api/v1/goods'
        return fetch(goodsUrl).then((data) => data.json()).then((products) => {
          dispatch({ type: GET_GOODS, payload: products })
          dispatch({ type: LOADED, payload: true })
        })
  }
}

export function newPage(pageNumber) {
  return { type: NEW_PAGE, payload: pageNumber }
}

export function filter(sortType, sortDirection) {
  return async (dispatch) => {
    const sortUrl = `/api/v1/goods/${sortType}/${sortDirection}`
    const filteredList = await fetch(sortUrl).then((data) => data.json())
    return dispatch({ type: FILTER, payload: filteredList, sortType, sortDirection })
  }
}