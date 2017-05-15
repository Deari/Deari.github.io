import { getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import { getEnvDomain } from 'utils/d'
import LoginSDK from 'utils/loginSDK'

export function login (callback) {
  let sourceVal = getSourceVal()
  let checkUrl = getLoginDomain(`passport/session-check.json`)
  let loginUrl = getApiDomain(`#/login?source=${sourceVal}`)
  let callbackUrl = location.href

  LoginSDK.getStatus(function (status, data) {
    if (status) {
      callback(data)
    }
  }, checkUrl, loginUrl, callbackUrl)
}

export function logout (callback) {
  let quitUrl = getLoginDomain(`passport/session-remove.json`)
  LoginSDK.quit((status) => {
    if (status) {
      callback()
    }
  }, quitUrl)
}
