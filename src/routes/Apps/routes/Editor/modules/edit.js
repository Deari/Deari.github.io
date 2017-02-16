import { getDomain } from 'utils/domain'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'

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
    const url = getDomain(`web/developer/app/${appId}`)
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {

        const { appName, appLogo, appDesc, categoryId, platform, tags, isH5App, 
                fileName, fileLink, moduleName, setting} = res.data
        const { codeDesc, codeVersion} = res.data && res.data.versions && res.data.versions[0] || ''
        const autoPublish  = res.data && res.data.autoPublish || 1
        const showUpdateMsg  = res.data && res.data.showUpdateMsg || 0 
        const rnFrameworkVersion = res.data && res.data.rnFrameworkVersion || 0
        const tagId = tags.map(v=>v.tagId)
        
        const versionsarray1 = [
          parseInt(codeVersion.split(".")[0]), parseInt(codeVersion.split(".")[1])+1,0
        ]
        const versionsarray2 = [
          parseInt(codeVersion.split(".")[0])+1, 0, 0
        ]
        
        const versionsList = [
          {'value':codeVersion},
          {'value':versionsarray1.join('.')},
          {'value':versionsarray2.join('.')}
        ]
        console.log(versionsList)
        dispatch(updateForm1({
          appId, appName, appLogo, appDesc, categoryId, platform, isH5App,
          tags: tagId
        }))

        dispatch(updateForm2({
          appId,
          platform, isH5App, codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting,
          versionsList,
        })) 

      } else {
        debug.warn('获取应用详情失败')
      }
    }).catch(e=>{
      console.log('获取应用详情失败', e)
    })
  }
}

export const updateFirstForm = (values) => {
  return (dispatch) => {
    dispatch(updateForm1(values))
  }
}
export const updateSecondForm = (values) => {
  return (dispatch) => {
    dispatch(updateForm2(values))
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
      active:'',
      publishList: [
        { txt: '自动发布此版本', value: 1 },
        { txt: '手动发布此版本', value: 0 },
      ],
      versionsList:[
        {value:"0.0.1"},
        {value:"0.1.0"},
        {value:"1.0.0"}
      ],
      showUpdateMsg:0,
      codeDesc: '',
      appId: -1,
      codeId:-1,
      platform: 2,
      isH5App: 0,
      autoPublish:1,
  },
}

export default function appsReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}