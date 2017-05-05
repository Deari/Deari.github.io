import { getLoginDomain, getApiDomain, getSourceVal } from 'utils/domain'
import { getEnvDomain } from 'utils/d'
import LoginSDK from 'utils/loginSDK'

export function login(callback) {
  let sourceVal = getSourceVal()
  let checkUrl = getLoginDomain(`passport/session-check.json`)
  let loginUrl = getApiDomain(`#/login?source=${sourceVal}`)
  let callbackUrl = location.href

  LoginSDK.getStatus(function (status) {
    if(status) {
      callback()
    }
  }, checkUrl, loginUrl, callbackUrl)
}