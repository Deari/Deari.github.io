import { getDomain } from 'utils/domain'
import fetchUtil from 'utils/fetchUtil'
import debug from 'utils/debug'

const PREFIX = 'CREATE_APP_'

const TOGGLE_STEP = PREFIX+'TOGGLE_STEP'

const REQUEST_TAGS = PREFIX+'REQUEST_TAGS'
const RECEIVE_TAGS = PREFIX+'RECEIVE_TAGS'

const REQUEST_CATES = PREFIX+'REQUEST_CATES'
const RECEIVE_CATES = PREFIX+'RECEIVE_CATES'

const UPDATE_FORM2 = PREFIX+'UPDATE_FORM2'

const UPDATE_ISH5APP = PREFIX+'UPDATE_ISH5APP'

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

export const updateForm2 = (data) => ({
  type : UPDATE_FORM2,
  data
})

export const updateIsH5App = (data) => ({
  type : UPDATE_ISH5APP,
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
    page: 0,
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
}

export default function appsReducer(state, action) {
 if(!state) {
   state = getInitialState()
 }
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}
