import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from '../../../../utils/domain'

const TOGGLE_STEP = 'TOGGLE_STEP';
const TOGGLE_TAG = 'TOGGLE_TAG';
const SUBMIT_CREATE = 'SUBMIT_CREATE';
const SUBMIT_CREAT_ING = 'SUBMIT_CREAT_ING'
const SUBMIT_CREATE_COMPLETE = 'SUBMIT_CREATE_COMPLETE'
const REQUEST_TAGS = 'REQUEST_TAGS'
const RECEIVE_TAGS = 'RECEIVE_TAGS'

const REQUEST_CATES = 'REQUEST_CATES'
const RECEIVE_CATES = 'RECEIVE_CATES'

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


export const updateForm2 = (data) => {
    console.log(12211, data);
  
  return {
    type : UPDATE_FORM2,
    data
  }
}

const ACTION_HANDLERS = {
  [TOGGLE_TAG]: (state, action) => {
    console.log(state);
    const form = state.form;
    const newTags = form.tags.filter(function (v){
      return v != action.tagId
    });

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
    console.log(action.type);
    return state;
  },

  [SUBMIT_CREATE_COMPLETE]: (state, action) => {
    return {
      ...state,
      form2: {
        ...state.form2,
        appId: action.appId
      }
    }
    return state;
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

  [UPDATE_FORM2]: (state, action)=>{
    return {
      ...state,
      file: action.data
    }
  }
}

const initialState = {
  page: 1,
  cates: [{ 
    categoryId: 1,
    categoryName: "xx"
  },{ 
    categoryId: 2,
    categoryName: "xsdfsd"
  },{ 
    categoryId: 3,
    categoryName: "sdkfhds"
  }],

  tags: [{
    tagId: 1,
    tagName: 'test1'
  },{
    tagId: 2,
    tagName: 'test2'
  },{
    tagId: 3,
    tagName: 'test3'
  }],
  
  form: {
    appName: 'test',
    appLogo: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    appDesc: '1111',
    categoryId: 0,
    platform: 2,
    tags: [1,2],
  },

  form2: {
    codeDesc: '测试修改',
    appId: '',
    file: null
  },

  file: null
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}


export const submitCreateForm = (formData) => {
  return (dispatch) => {
    dispatch(requestSubmitCreate());
    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/developer/app`)
    return fetchUtil.postJSON(url, formData, { jsonStringify: false})
      .then((res)=>{
        if(res.status == 200) {
          dispatch(completeSubmitCreate(res.data.app.appId));
        } else {
          throw Error('submit error');
        }
      }).catch(err=>{
        console.log(err);
      })
  }
}

export const fetchTags = () => {
  return (dispatch) => {
    // 拉取标签数据
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/public/app/tags");

    return fetchUtil.getJSON(url).then(res=>{
      console.info(res)
      if(res.status == 200) {
        dispatch(getTags(res.data));
      } else {
        throw Error ('get tags error');
      }
    }).catch(e=>{
      console.log('net error');
    });
  }
}

export const fetchCates = () => {
  return (dispatch) => {

    // 拉取 select 列表数据
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/public/app/categories");
    return fetchUtil.getJSON(url).then(res=>{
      console.info(res)
      if(res.status == 200) {
        dispatch(getCates(res.data && res.data.list));
      } else {
        throw Error ('get Categories error');
      }
    });
  }
}


