const GET_GOODS = 'ecommerce/goods/GET_GOODS'
const NEW_PAGE = 'ecommerce/goods/NEW_PAGE'
const FILTER_PRICE = 'ecommerce/goods/FILTER_PRICE'
const FILTER_TITLE = 'ecommerce/goods/FILTER_TITLE'
const LOADED = 'ecommerce/goods/LOADED'
const GET_CURRENCY = 'ecommerce/goods/GET_CURRENCY'
const CURRENCY = 'ecommerce/goods/CURRENCY'
const ADD_CART = 'ecommerce/goods/ADD_CART'
// const FILTER_MAX_MIN = 'ecommerce/goods/FILTER_MAX_MIN'

const initialState = {
  listOfGoods: [],
  listOfCart: [{
    id: "c7f6153d-5586-495c-beb2-4758bb8a6451",
    title: "Beer - Labatt Blue",
    image: "http://dummyimage.com/128x151.jpg/dddddd/000000",
    price: 10,
    description: "recontextualize rich eyeballs",
    quantity: 1
  }],
  currentPage: 1,
  goodsOnPage: 15,
  currency: 'EUR',
  rates: {
        USD: 1.056943,
        EUR: 1,
        CAD: 1.434356
    },
  sortPrice: 'min',
  sortTitle: 'max',
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
    case FILTER_PRICE: {
      return {
        ...state,
        listOfGoods: action.payload,
        sortPrice: action.sortDirection
      }
    }
    case FILTER_TITLE: {
      return {
        ...state,
        listOfGoods: action.payload,
        sortTitle: action.sortDirection
      }
    }
    case LOADED: {
      return {
        ...state,
        loaded: action.payload
      }
    }
    case GET_CURRENCY: {
      return {
        ...state,
        rates: action.payload
      }
    }
    case CURRENCY: {
      return {
        ...state,
        currency: action.payload
      }
    }
    case ADD_CART: {
      return {
        ...state,
        listOfCart: action.payload
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
    return sortType === 'price' ?
      dispatch({ type: FILTER_PRICE, payload: filteredList, sortDirection }) :
      dispatch({ type: FILTER_TITLE, payload: filteredList, sortDirection })
  }
}

export function getCurrency() {
  return async (dispatch) => {
    const currencyUrl = '/api/v1/currency'
    const currency = await fetch(currencyUrl).then((data) => data.json())
    return dispatch({ type: GET_CURRENCY, payload: currency.rates})
  }
}

export function setCurrency(currency) {
  return { type: CURRENCY, payload: currency }
}

export function addToCart(currency) {
  return { type: ADD_CART, payload: currency }
}