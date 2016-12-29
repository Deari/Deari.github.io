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

  form: {
    hardwareName: '默认硬件1',
    hardwareLogo: 'https://ss0.bdstatic.com/k4oZeXSm1A5BphGlnYG/xingzuo/big/24/juxie.png',
    hardwareFunction: '',
    majorCategoryId: 0,
    minorCategoryId: 0,
    category: {

    },
    tags: [],
  },

  form2: {
    hardwareMode: '默认数据',
    hardwarePics: [],
    hardwareBrand: '',
    hardwareProducer: '',
    commType1: 0,
    commType2: 0,
    hardwareDetail: '',
    sdkType: 0,
    os: 0,
    hardwarePlatform: 0,
    hardwareReport: ''

  }
}

export default function createReducer(state = initialState, action) {
 const handler = ACTION_HANDLERS[ action.type ]
 return handler ? handler(state, action) : state
}


export const submitCreateForm = (formData) => {
  return (dispatch) => {
    dispatch(requestSubmitCreate());
    const url = getDomain(`http://api.intra.`,`ffan.net/bo/v1/web/hardware/addHardware/step1`)
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
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/public/common/tags?type=hardwares");
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
    const url = getDomain("http://api.intra.","ffan.net/bo/v1/web/hardware/getCategory");
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


