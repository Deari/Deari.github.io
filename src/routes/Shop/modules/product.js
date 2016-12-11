const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

const initialState = {
  products: [
    { productId: 101, name: 'WIFI', width: 1, height: 1 },
    { productId: 102, name: 'BeaconI', width: 1, height: 1 },
    { productId: 103, name: 'WIFiI', width: 1, height: 1 },
    { productId: 104, name: 'WIFI', width: 1, height: 1 },
    { productId: 105, name: 'WIFI', width: 1, height: 1 },
    { productId: 106, name: 'WIFI', width: 1, height: 1 },
  ]
}

export const getProduct = (data) => {
  return {
    type: REQUEST_PRODUCTS,
    data
  }
}

export const fetchProducts = () => {
  return (dispatch, getState) => {
    // TODO: from server
    return new Promise(resolve => {
      dispatch(getProduct(initialState))
      resolve()
    })
  }
}

export const actions = {
  fetchProducts,
}

const ACTION_HANDLERS = {
  [REQUEST_PRODUCTS]: (state, action) => ({ ...action.data })
}

export default function productReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}

