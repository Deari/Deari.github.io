import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
import debug from 'utils/debug'

const TOGGLE_STEP = 'TOGGLE_STEP'
const TOGGLE_TAG = 'TOGGLE_TAG'
const SUBMIT_CREATE = 'SUBMIT_CREATE'
const SUBMIT_CREAT_ING = 'SUBMIT_CREAT_ING'
const SUBMIT_CREATE_COMPLETE = 'SUBMIT_CREATE_COMPLETE'

const RECEIVE_VERSIONSLIST = 'RECEIVE_VERSIONSLIST'
const RECEIVE_CODEID = 'RECEIVE_CODEID'

const REQUEST_TAGS = 'REQUEST_TAGS'
const RECEIVE_TAGS = 'RECEIVE_TAGS'
const REQUEST_CATES = 'REQUEST_CATES'
const RECEIVE_CATES = 'RECEIVE_CATES'

const UPDATE_FORM = 'UPDATE_FORM'
const UPDATE_FORM2 = 'UPDATE_FORM2'
const UPDATE_CODE_DESC = 'UPDATE_CODE_DESC'

const UPDATE_CONFIGARR = 'UPDATE_CONFIGARR'
const UPDATE_CONFIGTYPE = 'UPDATE_CONFIGTYPE'
const UPDATE_CONFIGID = 'UPDATE_CONFIGID'
const UPDATE_CONFIGLABEL = 'UPDATE_CONFIGLABEL'
const UPDATE_CONFIGVALUE = 'UPDATE_CONFIGVALUE'
const UPDATE_CONFIGDESC = 'UPDATE_CONFIGDESC'

const UPDATE_CONFIGAUDIOARR = 'UPDATE_CONFIGAUDIOARR'
const UPDATE_CONFIGAUDIOKEY = 'UPDATE_CONFIGAUDIOKEY'
const UPDATE_CONFIGAUDIOVALUE = 'UPDATE_CONFIGAUDIOVALUE'

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

export const receiveVersionsList= (versionsList) => ({
  type :  RECEIVE_VERSIONSLIST,
  versionsList
})

export const receiveCodeId= (codeId) => ({
  type :  RECEIVE_CODEID,
  codeId
})


export const updateForm2 = (data) => ({
  type : UPDATE_FORM2,
  data
})

export const updateForm = (data) => ({
  type : UPDATE_FORM,
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
       console.log(action)
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
    console.log(action)
    const configList = state.form2.configList;
    let newList = [...configList];
    if(action.index!=-1){
      newList.splice(action.index,1)
    }else{
      const obj = { type: 'input', id: 0, label: '', value: '', desc: '', enableEdit: true,audioList:[]}
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
  [RECEIVE_CODEID]:(state,action)=>{
    return {
      ...state,
      form2: {
        ...state.form2,
        codeId:action.codeId
      }
    }
  },
  [RECEIVE_VERSIONSLIST]:(state,action)=>{
      return {
        ...state,
        form2: {
          ...state.form2,
          versionsList:action.versionsList,
          codeVersion: action.versionsList[2].value
        }
      }
  },
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
  },

  [UPDATE_CODE_DESC]: (state, action) => {
    return {
      ...state,
      form2: {
        ...state.form2,
        ...action.data
      }
    }
  },

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
    appKind: 0
  },
  form2: {
    codeId:-1,
    publishList: [
      { txt: '自动发布此版本', value: 1 },
      { txt: '手动发布此版本', value: 0 },
    ],
    versionsList: [
      { value: "0.0.1" },
      { value: "0.1.0" },
      { value: "1.0.0" }
    ],
    configList:[],
    codeDesc: '',
    codeDescCount: 0,
    isDescErr: false,
    platform: 2,
    appKind: 0,
    showUpdateMsg: 0,
    appId: -1,
    codeId: -1,
    autoPublish: 1,
    codeVersion: -1
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
        const { appName, appLogo, appThumb, appPreviewImage, appDesc, categoryId, platform, tags, appKind, defaultLayout:size,
          fileName, fileLink, moduleName, } = res.data
        const {codeDesc = '', autoPublish = 1, showUpdateMsg = 0,
          rnFrameworkVersion = 0, codeSetting=''} = res.data && res.data.versions[0]
        const codeDescCount = codeDesc && codeDesc.length 
        let setting = codeSetting ? codeSetting : res.data.versions[1]&&res.data.versions[1].codeSetting ;

        const tagId = tags.map(v=>v.tagId)
        dispatch(updateForm({
          appId,
          appName, appLogo, appThumb, appPreviewImage, appDesc, categoryId, platform, appKind, size,
          tags: tagId
        }))

        dispatch(updateForm2({ 
          appId,
          platform, appKind, codeDesc,codeDescCount, fileName, fileLink, rnFrameworkVersion, moduleName,  
        }))
        !setting?'':dispatch(updateForm2({configList:JSON.parse(setting)}))
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

export const updateSecondForm = (values) => {
  return (dispatch) => {
    dispatch(updateForm2(values))
  }
}