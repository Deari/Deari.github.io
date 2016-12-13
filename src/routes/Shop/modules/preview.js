import randomstring from 'randomstring'


const ADD_ELEMENT = 'ADD_ELEMENT'

export const addElement = (item) => {
  return {
    type   : ADD_ELEMENT,
    element: { ...item },
  }
}

export const actions = {
  addElement,
}

const ACTION_HANDLERS = {
  [ADD_ELEMENT]: (state, action) => {
    const elements = state.elements
    const element = {
      ...{
        id: randomstring.generate({
          length        : 7,
          charset       : 'alphabetic',
          capitalization: 'uppercase',
        })
      },
      ...action.element,
    }

    elements.push(element)
    return { ...state, ...{ elements } }
  }
}

const defaultState = {
  elements: []
}

export default function productReducer(state = defaultState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
