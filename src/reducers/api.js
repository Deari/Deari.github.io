import { getDomain } from 'utils/d'
import fetchUtil from 'utils/fetch'

export const uploadImage = (params) => {
  const url = getDomain('/app/v1/bo/v1/web/photo/upload')
  return fetchUtil.postJSON(url, params, { formDataType: 'file' })
}

export const fetchTags = (params) => {
  const url = getDomain('/app/v1/bo/v1/public/app/tags')
  return fetchUtil.getJSON(url, params)
}

export const fetchCates = (params) => {
  const url = getDomain('/app/v1/bo/v1/public/app/categories')
  return fetchUtil.getJSON(url, params)
}

export const getAppInfo = (params) => {
  const url = getDomain(`/app/v1/bo/v1/web/developer/app/${params.appId}`)
  return fetchUtil.getJSON(url);
}

export const postAppBasicInfo = (params) => {
  const url = getDomain('/app/v1/bo/v1/web/developer/app')
  return fetchUtil.postJSON(url, params )
}

export const postAppVersionInfo = (params) => {
  const url = getDomain(`/app/v1/bo/v1/web/developer/app/${params.appId}/code`)
  return fetchUtil.postJSON(url, params, { formDataType: true })
}