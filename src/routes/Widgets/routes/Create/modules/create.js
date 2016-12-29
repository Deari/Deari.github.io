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

export const completeSubmitCreate = (appId)=>({
  type: SUBMIT_CREATE_COMPLETE,
  appId
})

export const getTags = (data) => {
  return {
    type: RECEIVE_TAGS,
    data
  }
}

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
  return {
    type : UPDATE_FORM2,
    data
  }
}

const ACTION_HANDLERS = {
  [TOGGLE_TAG]: (state, action) => {
    const form = state.form;
    const pos = form.tags.indexOf(action.tagId);

    if(pos == -1) {
      form.tags.push(action.tagId);
    } else {
      form.tags.splice(pos, 1);
    }

    return {
      ...state,
      form: {
        ...form,
        tags: form.tags
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
  tags: [{
    tagId: 1,
    tagName: '正在加载...'
  }],
  sizeList :[
    { image: 'img1', value: '2x1' },
    { image: 'img2', value: '1x1' },
    { image: 'img3', value: '2x2' },
  ],
  form: {
    appName: '默认组件名1',
    appThumb: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    appPreviewImage: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    appLogo: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    appDesc: '',
    categoryId: 1,
    platform: 2,
    tags: [1],
    widgetH: 1,
    widgetW: 1
  },
  form2: {
    codeDesc: 'sasdasdas',
  }
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}


export const fetchTags = () => {
  return (dispatch) => {
    // 拉取标签数据
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/public/widget/tags");
    return fetchUtil.getJSON(url).then(res=>{
      console.info(res)
      if(res.status == 200) {
        dispatch(getTags(res.data));
      } else {
        throw Error ('get tags error');
      }
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


