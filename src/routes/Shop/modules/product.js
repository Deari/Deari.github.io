const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

const initialState = {
  products: [
    {
      productId: 101,
      name     : 'WIFI',
      w        : 2,
      h        : 1,
      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
      imgSrc   : 'http://www.scstorage.com/img/wifi-pic.jpg',
    },
    {
      productId: 102,
      name     : 'Beacon',
      w        : 3,
      h        : 1,
      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
      imgSrc   : 'http://www.scstorage.com/img/wifi-pic.jpg'
    },
    {
      productId: 103,
      name     : 'IMG1',
      w        : 1,
      h        : 1,
      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
      imgSrc   : 'http://www.scstorage.com/img/wifi-pic.jpg'
    },
    {
      productId: 104,
      name     : 'IMG2',
      w        : 2,
      h        : 1,
      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
      imgSrc   : 'http://www.scstorage.com/img/wifi-pic.jpg'
    },
    {
      productId: 105,
      name     : 'IMG3',
      w        : 1,
      h        : 3,
      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
      imgSrc   : 'http://www.scstorage.com/img/wifi-pic.jpg'
    },
    {
      productId: 106,
      name     : 'IMG4',
      w        : 2,
      h        : 2,
      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
      imgSrc   : 'http://www.scstorage.com/img/wifi-pic.jpg'
    },
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

