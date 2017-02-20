import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'

const TOGGLE_STEP = 'TOGGLE_STEP'
const TOGGLE_TAG = 'TOGGLE_TAG'
const SUBMIT_CREATE = 'SUBMIT_CREATE'
const SUBMIT_CREAT_ING = 'SUBMIT_CREAT_ING'
const SUBMIT_CREATE_COMPLETE = 'SUBMIT_CREATE_COMPLETE'
const REQUEST_TAGS = 'REQUEST_TAGS'
const RECEIVE_TAGS = 'RECEIVE_TAGS'

const REQUEST_CATES = 'REQUEST_CATES'
const RECEIVE_CATES = 'RECEIVE_CATES'

const UPDATE_FORM = 'UPDATE_FORM'
const UPDATE_FORM2 = 'UPDATE_FORM2'


export const requestSubmitCreate = ()=>({
  type: SUBMIT_CREAT_ING,
})

export const updateAppId = (appId)=>({
  type: SUBMIT_CREATE_COMPLETE,
  appId
})

export const getTags = (data) => ({
  type: RECEIVE_TAGS,
  data
})

export const getCates = (data) => ({
  type: RECEIVE_CATES,
  data
})

export const toggleStep = (page) => {
  return {
    type : TOGGLE_STEP,
    page
  }
}

export const toggleTag = (tagId) => {
  return {
    type : TOGGLE_TAG,
    tagId
  }
}


export const updateForm2 = (data) => ({
  type : UPDATE_FORM2,
  data
})

export const updateForm = (data) => ({
  type : UPDATE_FORM,
  data
})

const ACTION_HANDLERS = {
  [TOGGLE_TAG]: (state, action) => {
    const form = state.form
    const newTags = form.tags.filter(function (v){
      return v != action.tagId
    })

    if(newTags.length == form.tags.length) {
      newTags.push(action.tagId)
    }

    return {
      ...state,
      form: {
        ...form,
        tags: newTags
      }
    }
  },

  [TOGGLE_STEP]: (state, action) => {
    return {
      ...state,
      page: action.page
    }
  },

  [SUBMIT_CREAT_ING]: (state, action)=>{
    return state
  },

  [SUBMIT_CREATE_COMPLETE]: (state, action) => {
    return {
      ...state,
      form2: {
        ...state.form2,
        appId: action.appId
      }
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

  [UPDATE_FORM]: (state, action)=>{
    return {
      ...state,
      form: {
        ...state.form,
        ...action.data
      }
    }
  },

  [UPDATE_FORM2]: (state, action)=>{
    return {
      ...state,
      form2: {
        ...state.form2,
        ...action.data
      }
    }
  }

}

const initialState = {
  page: 2,
  cates: [{
    categoryId: 0,
    categoryName: "正在加载..."
  }],
  tags: [{
    tagId: 1,
    tagName: '正在加载...'
  }],
  sizeList :[
    { image: 'img1', value: {w:2,h:1} },
    { image: 'img2', value: {w:1,h:1} },
    { image: 'img3', value: {w:2,h:2} },
  ],
  form: {
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

export const fetchTags = () => {
  return (dispatch) => {
    const url = getDomain("public/common/tags?type=widget")
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        dispatch(getTags(res.data))
      } else {
        debug.warn("获取标签接口错误")
        throw Error ('get tags error')
      }
    }).catch(e => {
      console.log("网络错误", e)
    })
  }
}

export const fetchCates = () => {
  return (dispatch) => {

    // 拉取 select 列表数据
    const url = getDomain("public/app/categories")
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        dispatch(getCates(res.data && res.data.list))
      } else {
        debug.warn("获取分类接口错误")
        throw Error ('get Categories error')
      }
    }).catch(e => {
      console.log("网络错误", e)
    })
  }
}

export const getAppInfo = (appId) => {
  return (dispatch) => {
    const url = getDomain(`web/developer/app/${appId}`)
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        const { appName, appLogo, appThumb, appPreviewImage, appDesc, categoryId, platform, tags, isH5App, defaultLayout:size,
                fileName, fileLink, moduleName, setting } = res.data
        const { codeDesc } = res.data && res.data.versions && res.data.versions[0] || ''
        const rnFrameworkVersion = res.data.rnFrameworkVersion || 0
        const tagId = tags.map(v=>v.tagId)

        dispatch(updateForm({
          appId,
          appName, appLogo, appThumb,appPreviewImage, appDesc, categoryId, platform, isH5App, size,
          tags: tagId
        }))

        dispatch(updateForm2({ 
          appId,
          platform, isH5App, codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting 
        }))
        
      } else {
        debug.warn("获取组件详情失败")
      }
    }).catch(e => {
      console.log("获取组件详情失败", e)
    })
  }
}

export const updateFirstForm = (values) => {
  return (dispatch) => {
    dispatch(updateForm(values))
  }
}
