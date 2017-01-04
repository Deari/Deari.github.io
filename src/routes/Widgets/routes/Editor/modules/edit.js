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

const UPDATE_FORM = 'UPDATE_FORM'
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


export const updateForm2 = (data) => ({
  type : UPDATE_FORM2,
  data
})

export const updateForm = (data) => ({
  type : UPDATE_FORM,
  data
})

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
    { image: 'img1', value: {w:2,h:1} },
    { image: 'img2', value: {w:1,h:1} },
    { image: 'img3', value: {w:2,h:2} },
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
    platform: 2
  }
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}

export const fetchTags = () => {
  return (dispatch) => {
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/public/common/tags?type=widget");
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

export const getAppInfo = (appId) => {
  return (dispatch) => {
    const url = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/app/${appId}`);
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        console.log('组件详情：', res)
        
        const { appName, appLogo, appThumb,appPreviewImage, appDesc, categoryId, platform, tags, defaultLayout } = res.data;
        const size = defaultLayout? JSON.parse(defaultLayout) : {};
        const tagId = tags.map(v=>v.tagId);
        dispatch(updateForm({
          appId,
          appName, appLogo, appThumb,appPreviewImage, appDesc, categoryId, platform, size,
          tags: tagId
        }));
        
      } else {
        alert('获取组件详情失败: ', JSON.stringify(res));
        console.warn('获取组件详情失败: ', res);
      }
    }).catch(e=>{
      alert('获取组件详情失败: ', JSON.stringify(e));
      console.warn('获取组件详情失败: ', e);
    });
  }
}

export const getAppCodeInfo = (appId) => {
  return (dispatch) => {
    const url = getDomain(`http://api.intra.`, `ffan.net//bo/v1/web/developer/app/${appId}`);
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        console.log('组件 code详情：', res)
        const { codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting } = res.data;
        dispatch(updateForm2({
          appId,
          codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting
        }));
      } else {
        alert('组件 code详情失败: ', JSON.stringify(res));
        console.warn('组件 code详情失败: ', res);
        
      }
    }).catch(e=>{
      alert('组件 code失败: ', JSON.stringify(e));
      console.warn('组件 code详情失败: ', e);
    });
  }
}

