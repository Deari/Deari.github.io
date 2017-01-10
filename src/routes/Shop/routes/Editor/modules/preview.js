import { getRandomString } from '../../../../../components/utils'

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


export const addElement = makeActionCreator(ADD_ELEMENT, 'element')
export const setLayout = makeActionCreator(SET_LAYOUT, 'layouts')

export const selectElement = id => (dispatch, getState) => dispatch({
  type: SELECT_ELEMENT,
  id,
  selectedElement: getState().preview.elements.find(e => e.id === id),
})

export const actions = {
  addElement,
  setLayout,
  selectElement,
}

const ACTION_HANDLERS = {
  [ADD_ELEMENT]: (state, action) => ({
    ...state, elements: [ ...state.elements,
      {
        id: getRandomString({}),
        selected: false,
        ...action.element,
      } ]
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
