import fetchUtil from '../../../../utils/fetchUtil'

const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

//const initialState = {
//  products: [
//    {
//      productId: 101,
//      name: 'WIFI',
//      defaultLayout: {
//        w: 2,
//        h: 1,
//      },
//      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
//      imgSrc: 'http://www.scstorage.com/img/wifi-pic.jpg',
//    },
//    {
//      productId: 102,
//      name: 'Beacon',
//      defaultLayout: {
//        w: 1,
//        h: 1,
//      },
//      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
//      imgSrc: 'http://www.scstorage.com/img/wifi-pic.jpg'
//    },
//    {
//      productId: 103,
//      name: 'Clock',
//      defaultLayout: {
//        w: 1,
//        h: 1,
//        maxH: 1,
//      },
//      moduleName: 'clock',
//      moduleType: 'app',
//      thumbnail: 'http://image.coolapk.com/apk_logo/2016/0429/12202_1461928658_0692.png',
//      imgSrc: 'http://image.coolapk.com/apk_logo/2016/0429/12202_1461928658_0692.png'
//    },
//    {
//      productId: 104,
//      name: 'IMG2',
//      defaultLayout: {
//        w: 1,
//        h: 2,
//      },
//      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
//      imgSrc: 'http://www.scstorage.com/img/wifi-pic.jpg'
//    },
//    {
//      productId: 105,
//      name: 'IMG3',
//      defaultLayout: {
//        w: 1,
//        h: 1,
//      },
//      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',//
//      imgSrc: 'http://www.scstorage.com/img/wifi-pic.jpg'
//    },
//    {
//      productId: 106,
//      name: 'IMG4',
//      defaultLayout: {
//        w: 2,
//        h: 1,
//      },
//      thumbnail: 'http://www.scstorage.com/img/wifi-pic.jpg',
//      imgSrc: 'http://www.scstorage.com/img/wifi-pic.jpg'
//    },
//  ]
//}

export const getProduct = (data) => {
  return {
    type: REQUEST_PRODUCTS,
    data
  }
}

export const fetchProducts = () => {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      fetchUtil.getJSON('http://api.intra.sit.ffan.net/bo/v1/web/merchant/widgets')
        .then(v => {
          dispatch(getProduct({products: v.data}))
          resolve()
        })

    })
  }
}

export const actions = {
  fetchProducts,
}

const ACTION_HANDLERS = {
  [REQUEST_PRODUCTS]: (state, action) => {
    return { ...state, ...action.data }
  }
}

export default function productReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
