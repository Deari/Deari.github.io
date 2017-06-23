import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'

export const uploadImage = (params) => {
  const url = getDomain('/app/v1/bo/v1/web/photo/upload')
  return fetchUtil.postJSON(url, params, { formDataType: 'file' })
}

export const uploadFile = (params) => {
  const url = getDomain('/app/v1/bo/v1/web/file/upload')
  return fetchUtil.postJSON(url, params, { formDataType: 'file' })
}

export const fetchTags = (params) => {
  const url = getDomain(`/app/v1/bo/v1/public/${params.type}/tags`)
  return fetchUtil.getJSON(url, params)
}

export const fetchCates = (params) => {
  const url = getDomain('/app/v1/bo/v1/public/app/categories')
  return fetchUtil.getJSON(url, params)
}

export const getAppInfo = (id) => {
  const url = getDomain(`/app/v1/bo/v1/web/developer/app/${id}`)
  return fetchUtil.getJSON(url);
}

export const postAppBasicInfo = (params) => {
  let url = `/app/v1/bo/v1/web/developer/app`;
  if(params.appId) {
    url = `${url}/${params.appId}`
  }
  return fetchUtil.postJSON(getDomain(url), params )
}

export const postAppVersionInfo = (params) => {
  const url = getDomain(`/app/v1/bo/v1/web/developer/app/${params.appId}/code`)
  return fetchUtil.postJSON(url, params)
}

export const postWidgetBasicInfo = (params) => {
  let url = `/app/v1/bo/v1/web/developer/widget`;
  if(params.appId) {
    url = `${url}/${params.appId}`
  }
  return fetchUtil.postJSON(getDomain(url), params )
}

export const postWidgetVersionInfo = (params) => {
  const url = getDomain(`/app/v1/bo/v1/web/developer/widget/${params.appId}/code`)
  return fetchUtil.postJSON(url, params)
}


export const getDevInfo = (params) => {
  return fetchUtil.getJSON(getDomain('/app/v1/bo/v1/web/devDataById/self'))
}

