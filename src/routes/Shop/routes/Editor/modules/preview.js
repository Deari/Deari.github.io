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
const SELECT_ELEMENT = 'SELECT_ELEMENT'

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

  [SELECT_ELEMENT]: (state, action) => ({
    ...state, elements: state.elements.map(element => ({
      ...element, selected: element.id === action.id
    }))
  }),

}

const defaultState = {
  elements: [],
  layouts: [],
}

export default function productReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
