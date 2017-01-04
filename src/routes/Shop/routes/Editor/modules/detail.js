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

const SELECT_ELEMENT = 'SELECT_ELEMENT'

const SAVE_DETAIL = 'SAVE_DETAIL' // To : src/routes/Shop/routes/Editor/modules/preview.js

export const saveDetail = (element, detail) => dispatch => dispatch({
  type: SAVE_DETAIL,
  id: element.id,
  detail,
})


export const savePage = pageId => (dispatch, getState) => new Promise((resolve, reject) => {
  const state = getState()
  console.log(state)
  fetchUtil.postForm('http://api.intra.sit.ffan.net/bo/v1/web/merchant/store/3/page/3/publish',
    {
      viewData: state.preview,
    },
  ).then(v => {
    //console.log(v.data)
    resolve()
  })
})

const ACTION_HANDLERS = {

  [SELECT_ELEMENT]: (state, action) => {
    return { ...state, element: action.selectedElement }
  },

}

//export const actions = {
//  saveDetail,
//}

const initState = {
  element: {}
}

export default function detailReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
