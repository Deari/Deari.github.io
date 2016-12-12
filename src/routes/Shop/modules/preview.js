const ADD_ELEMENT = 'ADD_ELEMENT'

export const addElement = (item) => {
  return {
    type: ADD_ELEMENT,
    element: {...item}
  }
}

export const actions = {
  addElement,
}

const ACTION_HANDLERS = {
  [ADD_ELEMENT]: (state, action) => {
    const elements = state.elements
    elements.push(action.element)
    return {...state, ...{elements}}
  }
}

const defaultState = {
  elements: []
}

export default function productReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
