/**
 * 判断当前域名环境
 *
 *
 * getEnvDomain("http://open.test.ffan.net")
 * "test"
 * getEnvDomain("http://open.ffan.net")
 * "pub"
 * getEnvDomain("http://10")
 * "local"
 *
 * @param url
 * @returns {*}
 */
export function getDomainEnv (url) {
  const domainReg = new RegExp('open\.((test|sit)\.)?ffan\.net')
  const host = url || location.host
  const domainTestResult = host.match(domainReg)
  if (!domainTestResult) {
    return 'local'
  }

  if (domainTestResult[ 2 ]) {
    return domainTestResult[ 2 ]
  } else {
    return 'pub'
  }
}

// http://api.intra.sit.ffan.net/bo/v1/web/market/category/all/apps
// http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps

// getDomain("http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps")
// "http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

// getDomain("http://api.sit.ffan.com/app/v1/bo/v1/web/market/category/all/apps")
// "http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

// getDomain("http://api.intra.sit.ffan.net/bo/v1/web/market/category/all/apps")
// "http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

// getDomain("http://api.intra.ffan.net/bo/v1/web/market/category/all/apps")
// "http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

// getDomain("web/market/category/all/apps")
// "http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

/**
 * @param url
 * @returns {string}
 */
// 移动端
export function getMobileDomain (url) {
  const domainReg = new RegExp('^http:\/\/xapi\.intra\.(sit\.|test\.)?ffan\.net\/app\/v1\/bo\/v1\/|^http:\/\/xapi\.(sit\.|test\.)?ffan\.com\/app\/v1\/bo\/v1\/')
  const env = getDomainEnv()
  const domain = (env === 'pub') ? 'http://api.ffan.net/app/v1/bo/v1/' : 'http://xapi.intra.sit.ffan.net/app/v1/bo/v1/'
  return domain + url.replace(domainReg, '')
}
// 主站
export function getDomain (url) {
  const domainReg = new RegExp('^http:\/\/api\.(sit\.|test\.)?ffan\.net\/app\/v1\/bo\/v1\/|^http:\/\/api\.(sit\.|test\.)?ffan\.com\/app\/v1\/bo\/v1\/')
  const env = getDomainEnv()
  const domain = (env === 'pub') ? 'http://api.ffan.net/app/v1/bo/v1/' : 'http://api.sit.ffan.net/app/v1/bo/v1/'
  return domain + url.replace(domainReg, '')
}

export function getHardwareDomain (url) {
  const env = getDomainEnv()
  const domain = (env === 'pub') ? 'http://api.ffan.net/' : 'http://api.sit.ffan.net/'
  return domain + url
}
export function getDownloadDomain () {
  const env = getDomainEnv()
  const domain = (env === 'pub') ? 'http://fdfs.ffan.net' : 'http://fdfs.intra.sit.ffan.net'
  return domain
}
// 获取登录相关的接口地址
export function getLoginDomain (url) {
  const domainReg = new RegExp('^http:\/\/passport\.intra\.(sit\.|test\.)?ffan\.net\/')
  const env = getDomainEnv()
  const domain = (env === 'pub') ? 'http://passport.ffan.net/' : 'http://passport.intra.sit.ffan.net/'
  return domain + url.replace(domainReg, '')
}

export function getApiDomain (url) {
  const domainReg = new RegExp('^http:\/\/apistore\.intra\.(sit\.|test\.)?ffan\.net\/')
  const env = getDomainEnv()
  const domain = (env === 'pub') ? 'http://apistore.ffan.net/' : 'http://apistore.intra.sit.ffan.net/'
  return domain + url.replace(domainReg, '')
}

// 判断从哪个路由跳转的
export function getSourceVal (name) {
  const pathName = name || location.pathname

  if (pathName.search(/apps/) != -1) return 1
  if (pathName.search(/widgets/) != -1) return 2
  if (pathName.search(/hardware/) != -1) return 4

  return 5
}
