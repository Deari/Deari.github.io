import fetchUtil from 'utils/fetchUtil';
import { getMobileDomain } from 'utils/domain';

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
  const apiUrl = getMobileDomain(`web/merchant/deployPage/${deployId}/status`)
  const result = await fetchUtil.getJSON(apiUrl, {debug: 1})
  return result.data.status
}

const repeatPublishStatus = async deployId => {
  let result = await getPublishStatus(deployId)
  if (result !== 2 && result !== 3) {
    await sleep(1000)
    return await repeatPublishStatus(deployId)
  } else {
    return await result
  }
}

export const savePage = pageId => (dispatch, getState) => {
  const state = getState()
  const apiUrl =  getMobileDomain('web/merchant/store/3/page/3/publish')
  return fetchUtil.postForm(apiUrl,{viewData: state.preview, debug: 1}).then(v => {

    if(v.status == 200) {
      dispatch(startPublishPage())
      const { deployId } = v.data
      repeatPublishStatus(deployId).then(pubResult => {
        dispatch(endPublishPage(pubResult))
      }).catch(e => {
        console.log(e)
      })
    } else {
      console.log(v)
    }
  })
}

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
        codeSetting: state.element.codeSetting.map(item=>{
          if(item.label === action.label) {
            return {
              ...item,
              value: action.value
            }
          }
          return item;
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
