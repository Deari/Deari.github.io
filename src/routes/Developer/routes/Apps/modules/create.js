//const ACTION_HANDLERS = {
//  [ADD_ELEMENT]: (state, action) => ({
//    ...state, elements: [ ...state.elements,
//      {
//        id      : getRandomString({}),
//        selected: false,
//        ...action.element,
//      } ]
//  }),
//
//  [SET_LAYOUT]: (state, action) =>({
//    ...state, ...action.layout
//  }),
//
//
//  [SELECT_ELEMENT]: (state, action) => ({
//    ...state, elements: state.elements.map(element => ({
//      ...element, selected: element.id === action.id
//    }))
//  }),
//
//}
//
//const defaultState = {
//
//}
//
//
//export default function createReducer(state = defaultState, action) {
//  const handler = ACTION_HANDLERS[ action.type ]
//  return handler ? handler(state, action) : state
//}
