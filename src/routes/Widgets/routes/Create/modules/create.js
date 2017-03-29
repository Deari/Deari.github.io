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

const UPDATE_APPKIND = PREFIX+'UPDATE_APPKIND'
const UPDATE_CODE_DESC = PREFIX+'UPDATE_CODE_DESC'

const UPDATE_CONFIGARR = PREFIX+'UPDATE_CONFIGARR'
const UPDATE_CONFIGTYPE = PREFIX+'UPDATE_CONFIGTYPE'
const UPDATE_CONFIGID = PREFIX+'UPDATE_CONFIGID'
const UPDATE_CONFIGLABEL = PREFIX+'UPDATE_CONFIGLABEL'
const UPDATE_CONFIGVALUE = PREFIX+'UPDATE_CONFIGVALUE'
const UPDATE_CONFIGDESC = PREFIX+'UPDATE_CONFIGDESC'

const UPDATE_CONFIGAUDIOARR = PREFIX+'UPDATE_CONFIGAUDIOARR'
const UPDATE_CONFIGAUDIOKEY = PREFIX+'UPDATE_CONFIGAUDIOKEY'
const UPDATE_CONFIGAUDIOVALUE = PREFIX+'UPDATE_CONFIGAUDIOVALUE'

export const updateConfigArr = (index)=>({
  type:UPDATE_CONFIGARR,
  index
})
export const updateConfigAudioArr = (index,k)=>({
  type:UPDATE_CONFIGAUDIOARR,
  index,
  k
})
export const updateConfigAudioKey = (index,k,key)=>({
  type:UPDATE_CONFIGAUDIOKEY,
  index,
  k,
  key
})
export const updateConfigAudioValue = (index,k,value)=>({
  type:UPDATE_CONFIGAUDIOVALUE,
  index,
  k,
  value
})
export const updateconfigType = (index,configType)=>({
  type:UPDATE_CONFIGTYPE,
  configType,
  index
})
export const updateconfigId = (index,id)=>({
  type:UPDATE_CONFIGID,
  id,
  index
})
export const updateconfigLabel = (index,label)=>({
  type:UPDATE_CONFIGLABEL,
  label,
  index
})
export const updateconfigValue = (index,value)=>({
  type:UPDATE_CONFIGVALUE,
  value,
  index
})
export const updateconfigDesc = (index,desc)=>({
  type:UPDATE_CONFIGDESC,
  desc,
  index
})

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

export const updateAppkind = (data) => ({
  type : UPDATE_APPKIND,
  data
})

export const updateCodeDesc = (data) => ({
  type : UPDATE_CODE_DESC,
  data
})

const ACTION_HANDLERS = {
     [UPDATE_CONFIGAUDIOVALUE]:(state,action)=>{
     const configList = state.form2.configList
     let newList = [...configList];
     newList[action.index].audioList[action.k].audioValue = action.value
     return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
   },
   [UPDATE_CONFIGAUDIOKEY]:(state,action)=>{
     const configList = state.form2.configList
     let newList = [...configList];
     newList[action.index].audioList[action.k].audioKey = action.key
     return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
   },
   [UPDATE_CONFIGAUDIOARR]:(state,action)=>{
     const configList = state.form2.configList
     let newList = [...configList];
     if(action.k!=-1){
       newList[action.index].audioList.splice(action.k,1)
     }else{
       const obj = {audioKey:'',audioValue:''}
       newList[action.index].audioList.push(obj)
     }
    return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
  },
  [UPDATE_CONFIGTYPE]:(state,action)=>{
    const configList =  state.form2.configList
    let newList = [...configList]
    newList[action.index].type = action.configType
    return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
  },
  [UPDATE_CONFIGDESC]:(state,action)=>{
    const configList =  state.form2.configList
    let newList = [...configList]
    newList[action.index].desc = action.desc
    return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
  },
  [UPDATE_CONFIGVALUE]:(state,action)=>{
    const configList =  state.form2.configList
    let newList = [...configList]
    newList[action.index].value = action.value
    return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
  },
  [UPDATE_CONFIGLABEL]:(state,action)=>{
    const configList =  state.form2.configList
    let newList = [...configList]
    newList[action.index].label = action.label
    return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
  },
  [UPDATE_CONFIGID]:(state,action)=>{
    const configList =  state.form2.configList
    let newList = [...configList]
    newList[action.index].id = action.id
    return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
  },
  [UPDATE_CONFIGARR]:(state,action)=>{
    const configList = state.form2.configList;
    let newList = [...configList];
    if(action.index!=-1){
      newList.splice(action.index,1)
    }else{
      const obj = { type: 'input', id: 0, label: '', value: '', desc: '', enableEdit: true, audioList: [] }
      newList.push(obj)
    }
    return{
      ...state,
      form2:{
        ...state.form2,
        configList:newList
      }
    }
  },
  
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

  [UPDATE_APPKIND]: (state, action) => {
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
  },

  [UPDATE_CODE_DESC]: (state, action) => {
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
    categoryId: 8,
    platform: 0,
    tags: [],
    appKind: 0
  },
  form2: {
    codeId:-1,
    publishList: [
      { txt: '手动发布此版本', value: 0 },
      { txt: '自动发布此版本', value: 1 },
    ],
    versionsList: [
      { value: "1.0.0", txt: "大版本,调整了核心框架。" },
      { value: "0.1.0", txt: "小版本,增加核心功能。" },
      { value: "0.0.1", txt: "子版本,优化或修复bug。" },
    ],
    codeDesc: '',
    codeDescCount: 0,
    isDescErr: false,
    platform: 0,
    appKind: 0,
    showUpdateMsg: 0,
    configList:[],
    appId: -1,
    codeId: -1,
    autoPublish: 0,
    codeVersion: '0.0.1'
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


