//import randomstring from 'randomstring'

import { getRandomString } from '../../../components/utils'

const ADD_ELEMENT = 'ADD_ELEMENT'
const SET_LAYOUT = 'SET_LAYOUT'


export const addElement = (element) => ({
  type   : ADD_ELEMENT,
  element: element,
})

export const setLayout = layout => ({
  type  : SET_LAYOUT,
  layout: layout,
})

export const actions = {
  addElement,
  setLayout,
}

const ACTION_HANDLERS = {
  [ADD_ELEMENT]: (state, action) => {
    const elements = state.elements
    const element = {
      ...{ id: getRandomString({}) },
      ...action.element,
    }

    elements.push(element)
    return { ...state, ...{ elements } }
  },
  [SET_LAYOUT] : (state, action) =>
    ({ ...state, ...action.layout })
}

const defaultState = {
  elements: [],
  layout  : [],
}

export default function productReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
