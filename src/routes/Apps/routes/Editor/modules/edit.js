import { getDomain } from 'utils/domain'
import fetchUtil from 'routes/utils/fetchUtil'
import debug from 'routes/utils/debug'

const PREFIX = 'EDIT_APP_'

const TOGGLE_STEP = PREFIX+'TOGGLE_STEP'

const REQUEST_TAGS = PREFIX+'REQUEST_TAGS'
const RECEIVE_TAGS = PREFIX+'RECEIVE_TAGS'

const REQUEST_CATES = PREFIX+'REQUEST_CATES'
const RECEIVE_CATES = PREFIX+'RECEIVE_CATES'
const UPDATE_FORM1 = PREFIX+'UPDATE_FORM1'
const UPDATE_FORM2 = PREFIX+'UPDATE_FORM2'

export const receiveTags = (data) => ({
  type: RECEIVE_TAGS,
  data
})

export const receiveCates = (data) => ({
  type: RECEIVE_CATES,
  data
})

export const toggleStep = (page) => ({
  type : TOGGLE_STEP,
  page
})

export const updateForm1 = (data) => ({
  type: UPDATE_FORM1,
  data
})

export const updateForm2 = (data) => ({
  type : UPDATE_FORM2,
  data
})

export const getTags = () => {
  return (dispatch) => {
    const url = getDomain("public/app/tags")
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        dispatch(receiveTags(res.data))
      } else {
        throw Error ('getTags error')
      }
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
        throw Error ('getCates error')
      }
    })
  }
}

export const getAppInfo = (appId) => {
  return (dispatch) => {
    const url = getDomain(`web/app/${appId}`)
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        console.log('应用详情：', res)
        const { appName, appLogo, appDesc, categoryId, platform, tags, isH5App } = res.data
        const tagId = tags.map(v=>v.tagId)

        dispatch(updateForm1({
          appId, appName, appLogo, appDesc, categoryId, platform, isH5App,
          tags: tagId
        }))

        dispatch(updateForm2({
          platform, isH5App
        }))
        
      } else {
        alert('获取应用详情失败: ', JSON.stringify(res))
        console.warn('获取应用详情失败: ', res)
      }
    }).catch(e=>{
      alert('获取应用详情失败: ', JSON.stringify(e))
      console.warn('获取应用详情失败: ', e)
    })
  }
}

export const getAppCodeInfo = (appId) => {
  return (dispatch) => {
    const url = getDomain(`web/developer/app/${appId}`)
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        console.log('app code详情：', res)
        const { codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting } = res.data
        console.log(res.data)
        if(codeDesc==="undefined"){
          dispatch(updateForm2({
            appId,
            fileName, fileLink, rnFrameworkVersion, moduleName, setting
          }))
          return
        }
        dispatch(updateForm2({
          appId,
          codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting
        }))
      } else {
        alert('app code详情失败: ', JSON.stringify(res))
        console.warn('app code详情失败: ', res)
        
      }
    }).catch(e=>{
      alert('app code失败: ', JSON.stringify(e))
      console.warn('app code详情失败: ', e)
    })
  }
}

export const updateFirstForm = (values) => {
  return (dispatch) => {
    dispatch(updateForm1(values))
  }
}

const ACTION_HANDLERS = {
  
  [TOGGLE_STEP]: (state, action) => {
    return {
      ...state,
      page: action.page
    }
  },

  [UPDATE_FORM1]: (state, action)=>{
    return {
      ...state,
      form: {
        ...state.form,
        ...action.data
      }
    }
  },

  [UPDATE_FORM2]: (state, action) => {
    return {
      ...state,
      form2: {
        ...state.form2,
        ...action.data
      }
    }
  },

  [RECEIVE_TAGS]: (state, action) => ({
    ...state,
    tags: action.data
  }),

  [RECEIVE_CATES]: (state, action) => ({
    ...state,
    cates: action.data
  })
}

const initialState = {
  page: 1,
  cates: [{
    categoryId: 1,
    categoryName: "xx"
  }, {
    categoryId: 2,
    categoryName: "xsdfsd"
  }, {
    categoryId: 3,
    categoryName: "sdkfhds"
  }],

  tags: [{
    tagId: 1,
    tagName: 'test1'
  }, {
    tagId: 2,
    tagName: 'test2'
  }, {
    tagId: 3,
    tagName: 'test3'
  }],

  form: {
    appName: '',
    appLogo: '',
    appDesc: '',
    categoryId: -1,
    platform: 2,
    tags: [],
    isH5App: 0
  },

  form2: {
    codeDesc: '',
    appId: -1,
    platform: 2,
    isH5App: 0
  },
}

export default function appsReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}