import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'

const PREFIX = 'CREATE_WIDGET_'

const TOGGLE_STEP = PREFIX+'TOGGLE_STEP'
const REQUEST_TAGS = PREFIX+'REQUEST_TAGS'
const RECEIVE_TAGS = PREFIX+'RECEIVE_TAGS'

const REQUEST_CATES = PREFIX+'REQUEST_CATES'
const RECEIVE_CATES = PREFIX+'RECEIVE_CATES'

const UPDATE_FORM2 = PREFIX+'UPDATE_FORM2'

const UPDATE_ISH5APP = PREFIX+'UPDATE_ISH5APP'

export const receiveTags = (data) => {
  return {
    type: RECEIVE_TAGS,
    data
  }
}

export const receiveCates = (data) => ({
  type: RECEIVE_CATES,
  data
})

export const toggleStep = (page) => {
  return {
    type : TOGGLE_STEP,
    page
  }
}

export const updateForm2 = (data) => {
  return {
    type : UPDATE_FORM2,
    data
  }
}

export const updateIsH5App = (data) => ({
  type : UPDATE_ISH5APP,
  data
})

const ACTION_HANDLERS = {

  [TOGGLE_STEP]: (state, action) => {
    return {
      ...state,
      page: action.page
    }
  },

  [RECEIVE_TAGS]: (state, action)=>{
    return {
      ...state,
      tags: action.data
    }
  },

  [RECEIVE_CATES]: (state, action)=>({
    ...state,
    cates: action.data
  }),

  [UPDATE_FORM2]: (state, action)=>({
    ...state,
    form2: {
      ...state.form2,
      ...action.data
    }
  }),

  [UPDATE_ISH5APP]: (state, action) => {
    return {
      ...state,
      form: {
        ...state.form,
        ...action.data
      },
      form2: {
        ...state.form2,
        ...action.data
      }
    }
  }
  
}

const initialState = {
  page: 1,
  cates: [{
    categoryId: 0,
    categoryName: "正在加载..."
  }],
  tags: [{
    tagId: 1,
    tagName: '正在加载...'
  }],
  sizeList :[
    { image: 'img1', value: {widgetW:4,widgetH:2} },
    { image: 'img2', value: {widgetW:1,widgetH:1} },
    { image: 'img3', value: {widgetW:4,widgetH:4} },
    { image: 'img4', value: {widgetW:4,widgetH:1} },
  ],
  form: {
    showUpdateMsg:0,
    autoPublish:1,
    appName: '',
    appThumb: '',
    appPreviewImage: '',
    appLogo: '',
    appDesc: '',
    categoryId: -1,
    platform: 2,
    tags: [],
    isH5App: 0
  },
  form2: {
    publishList: [
      { txt: '自动发布此版本', value: 1 },
      { txt: '手动发布此版本', value: 0 },
    ],
    versionsList: [
      { value: "0.0.1" },
      { value: "0.1.0" },
      { value: "1.0.0" }
    ],
    codeDesc: '',
    platform: 2,
    isH5App: 0,
    showUpdateMsg: 0,
    appId: -1,
    codeId: -1,
    autoPublish: 1,
  }
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}


export const getTags = () => {
  return (dispatch) => {
    const url = getDomain("public/widget/tags")
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        dispatch(receiveTags(res.data))
      } else {
        debug.warn("获取标签接口错误")
      }
    }).catch(e => {
      console.log("网络错误", e)
    })
  }
}

export const getCates = () => {
  return (dispatch) => {
    const url = getDomain("public/app/categories")
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        dispatch(receiveCates(res.data && res.data.list))
      } else {
        debug.warn("获取分类接口错误")
      }
    }).catch(e => {
      console.log("网络错误", e)
    })
  }
}


