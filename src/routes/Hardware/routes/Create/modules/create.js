import fetchUtil from 'utils/fetchUtil'
import { getDomain } from 'utils/domain'
const PREFIX = 'HD_CREATE'

const TOGGLE_STEP = PREFIX+'TOGGLE_STEP'

const REQUEST_TAGS = PREFIX+'REQUEST_TAGS'
const RECEIVE_TAGS = PREFIX+'RECEIVE_TAGS'

const REQUEST_CATES = PREFIX+'REQUEST_CATES'
const RECEIVE_CATES = PREFIX+'RECEIVE_CATES'

const UPDATE_FORM1 = PREFIX+'UPDATE_FORM1'
const UPDATE_FORM2 = PREFIX+'UPDATE_FORM2'
const RECEIVE_SDKS = PREFIX+'RECEIVE_SDKS'


export const receiveTags = (data) => ({
  type: RECEIVE_TAGS,
  data
})

export const receiveCates = (data) => ({
  type: RECEIVE_CATES,
  data
})

export const receiveSdkInfo = (data) => ({
  type: RECEIVE_SDKS,
  data
})

export const updateForm1 = (data) => ({
  type: UPDATE_FORM1,
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

  [RECEIVE_SDKS]: (state, action)=>({
    ...state,
    sdkTypes: action.data.sdkType,
    osPlatforms: action.data.os,
    hardwarePlatforms: action.data.platform
  }),

  [UPDATE_FORM1]: (state, action)=>({
    ...state,
    form: {
      ...state.form,
      ...action.data
    }
  }),

  [UPDATE_FORM2]: (state, action)=>({
    ...state,
    form2: {
      ...state.form2,
      ...action.data
    }
  })
}

const initialState = {
  page: 1,
  cates: [{
    categoryId: 0,
    categoryName: "正在加载..."
  }],
  sdkTypes: [{
    categoryId: 0,
    categoryName: "正在加载..."
  }],
  osPlatforms: [{
    categoryId: 0,
    categoryName: "正在加载..."
  }],
  hardwarePlatforms: [{
    categoryId: 0,
    categoryName: "正在加载..."
  }],
  tags: [{
    tagId: 1,
    tagName: '正在加载...'
  }],

  form: {
    hardwareName: '',
    hardwareLogo: '',
    hardwareFunction: '',
    category: {
      majorCategoryId: -1,
      minorCategoryId: -1,
      minorCategories: [],
    },
    tags: [],
    hardwareMode: '',
    hardwareProducer: '',
    commType1: 0,
    commType2: 0,
    sdkType: -1,
    os: -1,
    hardwarePlatform: -1,
  },

  form2: {
    hardwarePics: [],
    hardwareBrand: '',
    hardwareDetail: '',
    hardwareReport: ''
  }
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}

export const getTags = () => {
  return (dispatch) => {
    // 拉取标签数据
    const url = getDomain("public/common/tags?type=hardware")
    return fetchUtil.getJSON(url).then(res=>{
      //console.info(res)
      if(res.status == 200) {
        dispatch(receiveTags(res.data))
      } else {
        throw Error ('get tags error')
      }
    })
  }
}

export const getCates = () => {
  return (dispatch) => {
    // 拉取 select 列表数据
    const url = getDomain("web/hardware/getCategory")
    return fetchUtil.getJSON(url).then(res=>{
      //console.info(res)
      if(res.status == 200) {
        dispatch(receiveCates(res.data && res.data.list))
      } else {
        throw Error ('get Categories error')
      }
    })
  }
}

export const getSdkInfo = () => {
  return (dispatch) => {

    // 硬件SDK分类信息
    const url = getDomain("web/hardware/getSdkInfo")

    return fetchUtil.getJSON(url).then(res=>{
      console.info(res)
      if(res.status == 200) {
        dispatch(receiveSdkInfo(res && res.data))
      } else {
        throw Error ('getSdkInfo error')
      }
    })
  }
}

export const updateFirstForm = (values) => {
  return (dispatch) => {
    dispatch(updateForm1(values))
  }
}






