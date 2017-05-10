import fetchUtil from 'utils/fetch'
import { getEnvDomain } from 'utils/d'

const APPSTORE = 'APPSTORE'
const APPSTORE_UPDATE = APPSTORE+'_UPDATE_LIST'

const update = (data) => ({
  type: APPSTORE_UPDATE,
  data
})


export const fetchAppList = (option) => {
  return (dispatch, getState) => {
    const state = getState().appStore;
    const { type } = state;
    const { tag, params } = option;
    const url = getEnvDomain()+`/app/v1/bo/v1/web/market/tag/${tag}/${type}`;
    return fetchUtil.getJSON(url, {
      ...state.params,
      ...params
    }).then( data => {
      let { list, page, meta } = data
      let total = page ? page.totalCount : meta.total
      if(type == 'hardware') {
        list = list.map((v)=>{
          return {
            price: v.price,
            appDesc:v.productDesc,
            appLogo:v.image,
            appName:v.verboseName,
            appId:v.id,
            developerName:v.brand
          }
        })
      }
      dispatch(update({ list, total, type }))
    }).catch(e=>{
      
    })
  }
}

const ACTION_HANDLERS = {
  [APPSTORE_UPDATE]: function (state, action) {
    return {
      ...state,
      ...action.data
    }
  }
}

const initialState = {
  list: [],
  total: 0,
  type: "",
  params: {
    limit: 15,
    page: 1
  }
}

export default function rootReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}

export const ActionCreaters = {
  update
}
