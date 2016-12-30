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
    appName: '',
    appLogo: '',
    appDesc: '',
    categoryId: -1,
    platform: 2,
    tags: [],
  },

  form2: {
    codeDesc: '',
    platform: 2
  },
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}

export const fetchTags = () => {
  return (dispatch) => {
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

export const getAppInfo = (appId) => {
  return (dispatch) => {
    const url = getDomain(`http://api.intra.`, `ffan.net/bo/v1/web/app/${appId}`);
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        console.log('应用详情：', res)
        const { appName, appLogo, appDesc, categoryId, platform, tags } = res.data;
        const tagId = tags.map(v=>v.tagId);

        dispatch(updateForm({
          appId, appName, appLogo, appDesc, categoryId, platform,
          tags: tagId
        }));
        
      } else {
        alert('获取应用详情失败: ', JSON.stringify(res));
        console.warn('获取应用详情失败: ', res);
      }
    }).catch(e=>{
      alert('获取应用详情失败: ', JSON.stringify(e));
      console.warn('获取应用详情失败: ', e);
    });
  }
}

export const getAppCodeInfo = (appId) => {
  return (dispatch) => {
    const url = getDomain(`http://api.intra.`, `ffan.net//bo/v1/web/developer/app/${appId}`);
    return fetchUtil.getJSON(url).then(res=>{
      if(res.status == 200) {
        console.log('app code详情：', res)
        const { codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting } = res.data;
        dispatch(updateForm2({
          appId,
          codeDesc, fileName, fileLink, rnFrameworkVersion, moduleName, setting
        }));
      } else {
        alert('app code详情失败: ', JSON.stringify(res));
        console.warn('app code详情失败: ', res);
        
      }
    }).catch(e=>{
      alert('app code失败: ', JSON.stringify(e));
      console.warn('app code详情失败: ', e);
    });
  }
}

