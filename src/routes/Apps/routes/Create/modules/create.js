import { getDomain } from 'utils/domain'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'

const PREFIX = 'CREATE_APP_'

const TOGGLE_STEP = PREFIX+'TOGGLE_STEP'
const TOGGLE_ACTIVE = PREFIX+'TOGGLE_ACTIVE'

const TOGGLE_LOGOLIST = PREFIX+'TOGGLE_LOGOLIST'
const TOGGLE_IDLIST = PREFIX+'TOGGLE_IDLIST'
const WTOGGLE_LOGOLIST =  PREFIX+'WTOGGLE_LOGOLIST'
const WTOGGLE_IDLIST =  PREFIX+'WTOGGLE_IDLIST'
const TOGGLE_NAMELIST = PREFIX+'TOGGLE_NAMELIST'
const WTOGGLE_NAMELIST = PREFIX+'WTOGGLE_NAMELIST'

const REQUEST_TAGS = PREFIX+'REQUEST_TAGS'
const RECEIVE_TAGS = PREFIX+'RECEIVE_TAGS'

const REQUEST_CATES = PREFIX+'REQUEST_CATES'
const RECEIVE_CATES = PREFIX+'RECEIVE_CATES'

const UPDATE_FORM2 = PREFIX+'UPDATE_FORM2'

const UPDATE_APPKIND = PREFIX+'UPDATE_APPKIND'
const UPDATE_CODE_DESC = PREFIX+'UPDATE_CODE_DESC'
const UPDATE_CODE_VERSION = PREFIX+'UPDATE_CODE_VERSION'

export const toggleCodeVersion = (version) => ({
  type: UPDATE_CODE_VERSION,
  version
})

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

export const toggleActive= (active) => ({
  type : TOGGLE_ACTIVE,
  active: active
})

export const toggleLogoList= (logo) => ({
  type : TOGGLE_LOGOLIST,
  logo:logo
})

export const toggleIdList= (id) => ({
  type : TOGGLE_IDLIST,
  id:id
})

export const WtoggleLogoList= (logo) => ({
  type : WTOGGLE_LOGOLIST,
  logo:logo
})

export const WtoggleIdList= (id) => ({
  type : WTOGGLE_IDLIST,
  id:id
})

export const toggleNameList= (name) =>({
  type : TOGGLE_NAMELIST,
  name
})

export const WtoggleNameList= (name) =>({
  type : WTOGGLE_NAMELIST,
  name
})

export const updateForm2 = (data) => ({
  type : UPDATE_FORM2,
  data
})

export const updateAppkind = (data) => ({
  type : UPDATE_APPKIND,
  data
})

export const updateCodeDesc = (data) => ({
  type : UPDATE_CODE_DESC,
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

export const actionCreator = {
  receiveTags,
  receiveCates,
  toggleStep,
  updateForm2,
}
const ACTION_HANDLERS = {
  [UPDATE_CODE_VERSION]:(state,action)=>{
    return {
      ...state,
      form2: {
        ...state.form2,
        codeVersion:action.version
      }
    }
  },
  [WTOGGLE_NAMELIST]:(state,action)=>{
    const nameList = state.form2.wNameList
    const newList = nameList.filter((v)=>v!=action.name)
    newList.length == nameList.length ? newList.push(action.name) : null;
    return {
      ...state,
      form2: {
        ...state.form2,
        wNameList:newList
      }
    }
 },
  [TOGGLE_NAMELIST]:(state,action)=>{
    const nameList = state.form2.nameList
    const newList = nameList.filter((v)=>v!=action.name)
    newList.length == nameList.length ? newList.push(action.name) : null;
    return {
      ...state,
      form2: {
        ...state.form2,
        nameList:newList
      }
    }
 },
 [WTOGGLE_IDLIST]: (state, action) => {
    const idList = state.form2.wIdList
    const newList = idList.filter((v)=>v!=action.id)
    newList.length == idList.length ? newList.push(action.id) : null;
    return {
      ...state,
      form2:{
        ...state.form2,
        wIdList: newList
      }
    }
  },
 [WTOGGLE_LOGOLIST]: (state, action) => {
    const logoList = state.form2.wLogoList
    const newList = logoList.filter((v)=>v!=action.logo)
    newList.length == logoList.length ? newList.push(action.logo) : null;
    return {
      ...state,
      form2: {
        ...state.form2,
        wLogoList:newList
      }
    }
  },
 [TOGGLE_IDLIST]: (state, action) => {
    const idList = state.form2.idList;
    const newList = idList.filter((v)=>v!=action.id)
    newList.length == idList.length ? newList.push(action.id) : null;
    return {
      ...state,
      form2:{
        ...state.form2,
        idList: newList
      }
    }
  },
  [TOGGLE_LOGOLIST]: (state, action) => {
    const logoList = state.form2.logoList
    const newList = logoList.filter((v)=>v!=action.logo)
    newList.length == logoList.length ? newList.push(action.logo) : null;
    return {
      ...state,
      form2:{
        ...state.form2,
        logoList: newList
      }
    }
  },
  [TOGGLE_ACTIVE]: (state, action) => {
    return {
      ...state,
      form2:{
        ...state.form2,
        active:action.active
      }
    }
  },
  [TOGGLE_STEP]: (state, action) => {
    return {
      ...state,
      page: action.page
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

  [UPDATE_CODE_DESC]: (state, action) => {
    return {
      ...state,
      form2: {
        ...state.form2,
        ...action.data
      }
    }
  },

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

  [RECEIVE_TAGS]: (state, action) => ({
    ...state,
    tags: action.data
  }),

  [RECEIVE_CATES]: (state, action) => ({
    ...state,
    cates: action.data
  })
}

const getInitialState = () => {
  return {
    page: 2,
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
      categoryId: 8,
      platform: 0,
      tags: [],
      appKind: 0
    },

    form2: {
      active:{
        trim:0,
        type:""
      },
      publishList: [
        { txt: '手动发布此版本', value: 0 },
        { txt: '自动发布此版本', value: 1 },
      ],
      idList:[],
      logoList:[],
      wLogoList:[],
      wIdList:[],
      nameList:[],
      wNameList:[],
      showUpdateMsg:0,
      codeDesc: '',
      codeDescCount: 0,
      isDescErr: false,
      appId: -1,
      appKey:'',
      appName:'',
      appLogo:'',
      codeId:-1,
      platform: 2,
      appKind: 0,
      autoPublish:0,
      codeVersion: '',
      developerKey: '',
      developerSecret: ''
    },
  }
}

export default function appsReducer(state, action) {
 if(!state) {
   state = getInitialState()
 }
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}
