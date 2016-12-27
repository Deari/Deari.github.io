function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[ argNames[ index ] ] = args[ index ]
    })
    return action
  }
}


const SELECT_ELEMENT = 'SELECT_ELEMENT'


const SAVE_DETAIL = 'SAVE_DETAIL'

export const saveDetail = makeActionCreator(SAVE_DETAIL, 'id')

const ACTION_HANDLERS = {

  [SELECT_ELEMENT]: (state, action) => {
    return { ...state, element: action.selectedElement }
  },

  [SAVE_DETAIL]: (state, action) => {

    console.log(state)
    return state
  }
}

//export const actions = {
//  saveDetail,
//}


export default function detailReducer(state = {}, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
