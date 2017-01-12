import fetchUtil from '../../../../utils/fetchUtil'

function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type }
    argNames.forEach((arg, index) => {
      action[ argNames[ index ] ] = args[ index ]
    })
    return action
  }
}

const SELECT_ELEMENT = 'SELECT_ELEMENT' // To : src/routes/Shop/routes/Editor/modules/preview.js

const CANCEL_ELEMENT = 'CANCEL_ELEMENT' // To : src/routes/Shop/routes/Editor/modules/preview.js
const DELETE_ELEMENT = 'DELETE_ELEMENT' // To : src/routes/Shop/routes/Editor/modules/preview.js'

const SAVE_DETAIL = 'SAVE_DETAIL' // To : src/routes/Shop/routes/Editor/modules/preview.js



export const saveDetail = (element, detail) => dispatch => dispatch({
  type: SAVE_DETAIL,
  id: element.id,
  detail,
})


export const savePage = pageId => (dispatch, getState) => new Promise((resolve, reject) => {
  const state = getState()
  fetchUtil.postForm('http://api.intra.sit.ffan.net/bo/v1/web/merchant/store/3/page/3/publish',
    {
      viewData: state.preview,
    },
  ).then(v => {
    console.log(v.data)
    resolve(v)
  })
})


export const cancelElement = () => dispatch => dispatch({
  type: CANCEL_ELEMENT,
})

export const deleteElement = id => dispatch => dispatch({
  type: DELETE_ELEMENT,
  id,
})

const ACTION_HANDLERS = {
  [CANCEL_ELEMENT]: state => ({ ...state, element: {} }),
  [DELETE_ELEMENT]: state => ({ ...state, element: {} }),
  [SELECT_ELEMENT]: (state, action) => ({ ...state, element: action.selectedElement }),
}

export const actions = {
  cancelElement,
  saveDetail,
}

const initState = {
  element: {}
}

export default function detailReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
