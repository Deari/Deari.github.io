import fetchUtil from 'utils/fetchUtil'
import { getRandomString } from '../../../../../components/utils'
import { getMobileDomain } from 'utils/domain';
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[ argNames[ index ] ] = args[ index ]
    })
    return action
  }
}

const ADD_ELEMENT = 'ADD_ELEMENT'
const SET_LAYOUT = 'SET_LAYOUT'

const SELECT_ELEMENT = 'SELECT_ELEMENT' // same as src/routes/Shop/routes/Editor/modules/detail.js
const SAVE_DETAIL = 'SAVE_DETAIL' // same as src/routes/Shop/routes/Editor/modules/detail.js
const CANCEL_ELEMENT = 'CANCEL_ELEMENT' // To : src/routes/Shop/routes/Editor/modules/preview.js
const DELETE_ELEMENT = 'DELETE_ELEMENT' // To : src/routes/Shop/routes/Editor/modules/preview.js'
const EDIT_ELEMENT = 'EDIT_ELEMENT' // To : src/routes/Shop/routes/Editor/modules/preview.js'
const REQUEST_PREVIEW = 'REQUEST_PREVIEW'

// export const addElement = makeActionCreator(ADD_ELEMENT, 'element', 'id')
export const addElement = makeActionCreator(ADD_ELEMENT, 'element')
export const setLayout = makeActionCreator(SET_LAYOUT, 'layouts')

const getPreviewData = data => ({
  type: REQUEST_PREVIEW,
  data,
})

export const fetchPreview = (pageID) => dispatch => {
  const apiUrl = getMobileDomain(`web/merchant/page/${pageID}`)
  return fetchUtil.getJSON(apiUrl, {debug: 1}).then(res => {
    if(res.status == 200) {
      dispatch(getPreviewData(res.data))
    } else if(res.status == 4201){
      alert('登陆异常，请重新登陆！')
    } else {
      console.log(res);
    }
  })
}

export const selectElement = id => (dispatch, getState) => dispatch({
  type: SELECT_ELEMENT,
  id,
  selectedElement: getState().preview.elements.find(e => e.id === id),
})

export const cancelElement = () => ({
  type: CANCEL_ELEMENT,
})

export const actions = {
  addElement,
  setLayout,
  selectElement,
  cancelElement
}

const ACTION_HANDLERS = {

  [REQUEST_PREVIEW]: (state, action) => ({ ...state, ...action.data.viewData }),

  [ADD_ELEMENT]: (state, action) => ({
    ...state, elements: state.elements.map(element => ({
      ...element, selected: false,
    })).concat({
      selected: true,
      ...action.element,
    })
  }),

  [SET_LAYOUT]: (state, action) => ({
    ...state, ...action.layouts
  }),

  [CANCEL_ELEMENT]: state => {
    return {
      ...state, elements: state.elements.map(element => ({
        ...element, selected: false,
      }))
    }
  },

  [DELETE_ELEMENT]: (state, action) => ({
    ...state, elements: state.elements.filter(element => element.id !== action.id)
  }),

  [EDIT_ELEMENT]: (state, action) => ({
    ...state, elements: state.elements.map(element => {
      if(element.id === action.id && Array.isArray(element.codeSetting)) {
        return {
          ...element,
          codeSetting: element.codeSetting.map(item=>{
            if(item.label === action.label) {
              return {
                ...item,
                value: action.value
              }
            }
            return item;
          })
        }
      }
      return element;
    })
  }),

  [SELECT_ELEMENT]: (state, action) => ({
    ...state, elements: state.elements.map(element => ({
      ...element, selected: element.id === action.id
    }))
  }),

  [SAVE_DETAIL]: (state, action) => {
    const elements = state.elements.map(e => {
      if (e.id === action.id) {
        return { ...e, detail: action.detail }
      } else {
        return e
      }
    })
    return { ...state, elements: elements }
  },

}

const defaultState = {
  elements: [],
  layouts: [],
}

export default function productReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
