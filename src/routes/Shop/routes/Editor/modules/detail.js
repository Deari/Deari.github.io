import fetchUtil from 'utils/fetchUtil';
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
const EDIT_ELEMENT = 'EDIT_ELEMENT'

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
    return await repeatPublishStatus(deployId)
  } else {
    return await result
  }
}

export const savePage = pageId => (dispatch, getState) => new Promise((resolve, reject) => {
  const state = getState()
  const apiUrl =  getDomain('http://api.intra.sit.ffan.net/bo/v1/web/merchant/store/3/page/3/publish')
  fetchUtil.postForm(apiUrl,{viewData: state.preview,}).then(v => {
    console.log(state.preview, "postData");

    dispatch(startPublishPage())
    const { deployId } = v.data
    repeatPublishStatus(deployId).then(pubResult => {
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

export const editElement = (id, label, value) => dispatch => dispatch({
  type: EDIT_ELEMENT,
  id,
  label,
  value
})

const ACTION_HANDLERS = {
  [CANCEL_ELEMENT]: state => ({ ...state, element: {} }),
  [DELETE_ELEMENT]: state => ({ ...state, element: {} }),
  [EDIT_ELEMENT]: (state, action) => {
    return {
      ...state, element: {
        ...state.element,
        editorConfig: state.element.editorConfig.map(config=>{
          if(config.label === action.label) {
            return {
              ...config,
              value: action.value
            }
          }
          return config;
        })
      }
    };
  },
  [SELECT_ELEMENT]: (state, action) => {
    return ({ ...state, element: action.selectedElement })
  },
  [PAGE_PUBLISH_START]: state => ({ ...state, pagePublish: 'start' }),
  [PAGE_PUBLISH_END]: (state, action) => ({ ...state, pagePublish: action.deployStatus === 2 ? 'end' : 'failure' }),
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
