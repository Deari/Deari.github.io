import fetch from '../../fetch'
import debug from './debug'

class FetchUtil {

  /**
   * GET 获取 JSON 对象
   * @param url string
   * @param params object
   * @param options object
   * @returns Promise
   */
  static async getJSON (url, params = {}, options = {}) {
    if (!url.trim()) {
      return reject(-101, 'URL is empty')
    }

    if (!isObject(params) || !isObject(options)) {
      return reject(-102, 'The type of params and options must be a Object')
    }
    params.clientType = 1

    params = getURLByObj(params)

    options = {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      // ...jsonHeaders,
      ...options
    }

    const quesMark = new RegExp('\\?').test(url) ? '&' : '?'
    const getURL = `${url}${quesMark}${params}`
    return new Promise((resolve, reject) => {
      fetch(getURL, options).then(async res => {
        if (res.ok) {
          try {
            const resp = await res.json()
            return resolve(resp)
          } catch (e) {
            return reject(e)
          }
        } else {
          return reject(res)
        }
      })[ 'catch' ](e => {
        return reject(e)
      })
    })
  }

  static async postForm (url, params = {}, options = {}) {
    if (!url.trim()) {
      return reject(-101, 'URL is empty')
    }

    if (!isObject(params) || !isObject(options)) {
      return reject(-102, 'The type of params and options must be a Object')
    }

    const fromData = new FormData()

    for (const p in params) {
      fromData.append(p, JSON.stringify(params[p]))
    }
    fromData.append('clientType', 1)

    params = getURLByObj(params)
    const reqsOptions = {
      method: 'POST',
      body : fromData,
      credentials: 'include',
      mode: 'cors',
      ...options
    }

    return new Promise((resolve, reject) => {
      fetch(url, reqsOptions).then(async res => {
        if (res.ok) {
          try {
            const resp = await res.json()
            return resolve(resp)
          } catch (e) {
            return reject(e)
          }
        } else {
          return reject(e)
        }
      })[ 'catch' ](e => {
        return reject(e)
      })
    })
  }

  /**

   * POST 获取 JSON 对象
   * @param url
   * @param params
   * @param options
   * @returns Promise
   */
  static async postJSON (url, params = {}, options = {}) {
    if (!url.trim()) {
      return reject(-101, 'URL is empty')
    }

    if (!isObject(params) || !isObject(options)) {
      return reject(-102, 'The type of params and options must be a Object')
    }
    if (params && typeof params.append === 'function') {
      params.append('clientType', 1)
    } else {
      params.clientType = 1
    }

    const reqsOptions = {
      method: 'POST',
      // credentials: !options.credentials ? 'include' : '',
      credentials: 'include',
      mode: 'cors',
      // ...jsonHeaders,
      body: !options.jsonStringify ? params : JSON.stringify(params)
    }

    return new Promise((resolve, reject) => {
      fetch(url, reqsOptions).then(async res => {
        if (res.ok) {
          try {
            const resp = await res.json()
            return resolve(resp)
          } catch (e) {
            return reject(e)
          }
        } else {
          return reject(e)
        }
      })[ 'catch' ](e => {
        return reject(e)
      })
    })
  }

  static async request (method, url, params = {}, options = {}) {
    if (!method) {
      return reject(-100, 'method is empty')
    }

    if (!url.trim()) {
      return reject(-101, 'URL is empty')
    }

    if (!isObject(params) || !isObject(options)) {
      return reject(-102, 'The type of params and options must be a Object')
    }

    params.clientType = 1

    options = {
      method: method,
      // ...jsonHeaders,
      ...options,
      body: JSON.stringify(params)
    }

    return new Promise((resolve, reject) => {
      fetch(url, options).then(async res => {
        if (res.ok) {
          try {
            const resp = await res.json()
            return resolve(resp)
          } catch (e) {
            return reject(e)
          }
        } else {
          return reject(e)
        }
      })[ 'catch' ](e => {
        return reject(e)
      })
    })
  }
}

export function isObject (x) {
  return x != null && typeof x === 'object'
}

export function reject (status, message) {
  return Promise.reject({ status, message })
}

export function getURLByObj (params) {
  return Object.keys(params).map(function (prop) {
    return [ prop, params[ prop ] ].map(encodeURIComponent).join('=')
  }).join('&')
}

const jsonHeaders = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
}

export default FetchUtil
