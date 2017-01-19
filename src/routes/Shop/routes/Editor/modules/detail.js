import fetchUtil from '../../../../utils/fetchUtil';
import { getDomain } from 'utils/domain';

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
  const apiUrl = getDomain(`http://api.intra.sit.ffan.net/bo/v1/web/merchant/deployPage/${deployId}/status`)
  const result = await fetchUtil.getJSON(apiUrl)
  return result.data.status
}

const repeatPublishStatus = async deployId => {
  let result = await getPublishStatus(deployId)
  if (result === 1) {
    await sleep(1000)
    await repeatPublishStatus(deployId)
  } else {
    console.log(result)
    // TODO : 如何返回?? 改成promise 函数
    return await result
  }
}

export const savePage = pageId => (dispatch, getState) => new Promise((resolve, reject) => {
  const state = getState()
  const apiUrl =  getDomain('http://api.intra.sit.ffan.net/bo/v1/web/merchant/store/3/page/3/publish')
  fetchUtil.postForm(apiUrl,{viewData: state.preview,}).then(v => {

    dispatch(startPublishPage())

    const { deployId } = v.data
    const result = repeatPublishStatus(deployId).then(pubResult => {
      //console.log(11111111111)
      //console.log(pubResult)
      dispatch(endPublishPage(pubResult))
      resolve(v)
    }).catch(e => {
      console.log(e)
    })

  })
})

export const startPublishPage = () => ({
  type: PAGE_PUBLISH_START,
})

export const endPublishPage = (deployStatus) => ({
  type: PAGE_PUBLISH_END,
  deployStatus,
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
  [PAGE_PUBLISH_END]: (state, action) => {
    console.log(action)
    return { ...state, pagePublish: action.deployStatus === 2 ? 'end' : 'failure' }
  },
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
