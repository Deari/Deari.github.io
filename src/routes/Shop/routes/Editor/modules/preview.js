//import randomstring from 'randomstring'

import { getRandomString } from '../../../../../components/utils'

const ADD_ELEMENT = 'ADD_ELEMENT'
const SET_LAYOUT = 'SET_LAYOUT'
const SELECT_ELEMENT = 'SELECT_ELEMENT'

export const addElement = (element) => ({
  type: ADD_ELEMENT,
  element,
})

export const setLayout = layout => ({
  type: SET_LAYOUT,
  layout,
})

export const selectElement = id => ({
  type: SELECT_ELEMENT,
  id,
})


export const actions = {
  addElement,
  setLayout,
  selectElement,
}

const ACTION_HANDLERS = {
  [ADD_ELEMENT]   : (state, action) => {
    const elements = state.elements
    const element = {
      ...{ id: getRandomString({}) },
      ...action.element,
    }
    elements.push(element)
    return { ...state, ...{ elements } }
  },
  [SET_LAYOUT]    : (state, action) =>
    ({ ...state, ...action.layout }),
  [SELECT_ELEMENT]: (state, action) => ({
    ...state, elements: state.elements.map(element => ({
      ...element, selected: element.id === action.id
    }))
  })
}

const defaultState = {
  elements: [],
  layout  : [],
}

export default function productReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
