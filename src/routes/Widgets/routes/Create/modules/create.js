import fetchUtil from '../../../../utils/fetchUtil'
import { getDomain } from 'utils/domain'
const PREFIX = 'CREATE_WIDGET_';

const TOGGLE_STEP = PREFIX+'TOGGLE_STEP';
const REQUEST_TAGS = PREFIX+'REQUEST_TAGS'
const RECEIVE_TAGS = PREFIX+'RECEIVE_TAGS'

const REQUEST_CATES = PREFIX+'REQUEST_CATES'
const RECEIVE_CATES = PREFIX+'RECEIVE_CATES'

const UPDATE_FORM2 = PREFIX+'UPDATE_FORM2'

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
    { image: 'img1', value: {widgetW:4,widgetH:2} },
    { image: 'img2', value: {widgetW:1,widgetH:1} },
    { image: 'img3', value: {widgetW:4,widgetH:4} },
    { image: 'img4', value: {widgetW:4,widgetH:1} },
  ],
  form: {
    appName: '',
    appThumb: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    appPreviewImage: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    appLogo: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    appDesc: '',
    categoryId: 1,
    platform: 2,
    tags: [],
  },
  form2: {
    codeDesc: '',
    platform: 2,
  }
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}


export const getTags = () => {
  return (dispatch) => {
    const url = getDomain("http://api.intra.sit.ffan.net/bo/v1/public/widget/tags");
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        dispatch(receiveTags(res.data));
      } else {
        throw Error ('getTags error');
      }
    });
  }
}

export const getCates = () => {
  return (dispatch) => {
    const url = getDomain("http://api.intra.sit.ffan.net/bo/v1/public/app/categories");
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        dispatch(receiveCates(res.data && res.data.list));
      } else {
        throw Error ('getCates error');
      }
    });
  }
}


