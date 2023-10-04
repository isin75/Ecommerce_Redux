// time of action in utc forma (+new Date())

export const CHANGE_CURRENCY = 'ecommerce/logs/CHANGE_CURRENCY'
export const ADD_GOODS = 'ecommerce/logs/ADD_GOODS'
const NAVIGATE_URL = '@@router/LOCATION_CHANGE'
export const SORT = 'ecommerce/logs/SORT'
export const ACTION = 'ecommerce/logs/ACTION'


const toServer = (text) => {
  fetch('/api/v1/logs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text
    })
  })
    .then(() => console.log('Done'))
    .catch((err) => console.log(err))
}

const logs = () => {
  return () => (next) => (action) => {
    switch (action.type) {
      case CHANGE_CURRENCY: {
        toServer(
          `change currency from ${action.payload.previousCurrency} to ${action.payload.newCurrency}`
        )
        break
      }
      case ADD_GOODS: {
        toServer(`add ${action.payload} to the backet`)
        break
      }
      case NAVIGATE_URL: {
        toServer(`navigate to ${action.payload.location.pathname} page`)
        break
      }
      case SORT: {
        toServer(`sort by ${action.sortDirection}`)
        break
      }
      case ACTION: {
        toServer(`time of action in utc forma ${(+new Date())}`)
        break
      }
      default:
        return next(action)
    }
    return next(action)
  }
}

export default logs