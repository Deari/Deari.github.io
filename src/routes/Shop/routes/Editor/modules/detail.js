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
const PAGE_PUBLISH_START = 'PAGE_PUBLISH_START'
const PAGE_PUBLISH_END = 'PAGE_PUBLISH_END'

export const saveDetail = (element, detail) => dispatch => dispatch({
  type: SAVE_DETAIL,
  id: element.id,
  detail,
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getPublishStatus = async deployId => {
  const result = await fetchUtil.getJSON(`http://api.intra.sit.ffan.net/bo/v1/web/merchant/deployPage/${deployId}/status`)
  return result.data.status
}

const repeatPublishStatus = async deployId => {
  let result = await getPublishStatus(deployId)
  if (result !== 2) {
    await sleep(1000)
    await repeatPublishStatus(deployId)
  } else {
    return result
  }
}

export const savePage = pageId => (dispatch, getState) => new Promise(async(resolve, reject) => {
  const state = getState()
  fetchUtil.postForm('http://api.intra.sit.ffan.net/bo/v1/web/merchant/store/3/page/3/publish',
    {
      viewData: state.preview,
    },
  ).then(v => {
    dispatch(startPublishPage())
    const { deployId } = v.data
    repeatPublishStatus(deployId).then(v => {
      dispatch(endPublishPage())
      resolve(v)
    }).catch(e => {
      console.log(e)
    })
  })
})

export const startPublishPage = () => ({
  type: PAGE_PUBLISH_START,
})

export const endPublishPage = () => ({
  type: PAGE_PUBLISH_END,
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
  [PAGE_PUBLISH_START]: state => ({ ...state, pagePublish: 'start' }),
  [PAGE_PUBLISH_END]: state => ({ ...state, pagePublish: 'end' }),
}

export const actions = {
  cancelElement,
  saveDetail,
}

const initState = {
  element: {},
  pagePublish: 'end'
}

export default function detailReducer(state = initState, action) {
  const handler = ACTION_HANDLERS[ action.type ]
  return handler ? handler(state, action) : state
}
