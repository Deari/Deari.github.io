import fetchUtil from 'utils/fetch'
import { getDomain } from 'utils/d'

const APPSTORE = 'APPSTORE'
const APPSTORE_UPDATE = APPSTORE + '_UPDATE_LIST'

const update = (data) => ({
  type: APPSTORE_UPDATE,
  data
})

export const fetchAppList = (option) => {
  return (dispatch, getState) => {
    
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
  appName: ''
  appLogo: '',
  appDesc: '',
  tags: []
}

export default function rootReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}

export const ActionCreaters = {
  update
}
