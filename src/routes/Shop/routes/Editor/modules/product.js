import fetchUtil from 'routes/utils/fetchUtil'

const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'

//const initialState = {
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
//  ]
//}

const customProduct = [
  {
    "merchantId": 1009999,
    "appId": 269,
    "appType": 2,
    "codeId": 209,
    "isUsed": 0,
    "appName": "Clock",
    "appDesc": "ClockDesc",
    "appThumb": "",
    "appPreviewImage": "http://img1.ffan.com/T1S6VTBjA_1RCvBVdK",
    "defaultLayout": {
      "w": 2,
      "h": 1
    },
    "appLogo": "http://image.coolapk.com/apk_logo/2016/0429/12202_1461928658_0692.png",
    "moduleName": "Clock",
    "moduleType": "html5",
  },
]

export const getProduct = (data) => ({
  type: REQUEST_PRODUCTS,
  data,
})

export const fetchProducts = () => {
  return (dispatch, getState) => new Promise(resolve => {
    fetchUtil.getJSON('http://api.intra.sit.ffan.net/bo/v1/web/merchant/widgets')
      .then(v => {
        let data = [ ...v.data ]
        //let data = [ ...customProduct, ...v.data ]
        dispatch(getProduct({ products: data }))
        resolve()
      })
  })
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
