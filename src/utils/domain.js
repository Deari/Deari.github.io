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
export function getDomainEnv(url) {
  const domainReg = new RegExp("open\.((test|sit)\.)?ffan\.net")
  const host = url || location.host;
  const domainTestResult = host.match(domainReg);
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


//getDomain("http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps")
//"http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

//getDomain("http://api.sit.ffan.com/app/v1/bo/v1/web/market/category/all/apps")
//"http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

//getDomain("http://api.intra.sit.ffan.net/bo/v1/web/market/category/all/apps")
//"http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

//getDomain("http://api.intra.ffan.net/bo/v1/web/market/category/all/apps")
//"http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"

//getDomain("web/market/category/all/apps")
//"http://api.ffan.com/app/v1/bo/v1/web/market/category/all/apps"


/**
 * @param url
 * @returns {string}
 */
export function getDomain(url) {
  const domainReg = new RegExp("^http:\/\/api\.intra\.(sit\.|test\.)?ffan\.net\/bo\/v1\/|^http:\/\/api\.(sit\.|test\.)?ffan\.com\/app\/v1\/bo\/v1\/")
  const env = getDomainEnv()
  const domain =  (env === 'pub') ? 'http://api.ffan.com/app/v1/bo/v1/' : 'http://api.intra.sit.ffan.net/bo/v1/'
  return domain + url.replace(domainReg, "")
}

export function getHardwareDomain(url) {
  const env = getDomainEnv()
  const domain =  (env === 'pub') ? 'http://api.ffan.com/' : 'http://api.sit.ffan.com/'
  return domain + url
}
// 获取登录相关的接口地址
export function getLoginDomain(url) {
  const domainReg = new RegExp("^http:\/\/passport\.intra\.(sit\.|test\.)?ffan\.net\/")
  const env = getDomainEnv()
  const domain =  (env === 'pub') ? 'http://passport.ffan.net/' : 'http://passport.intra.test.ffan.net/'
  return domain + url.replace(domainReg, "")
}

export function getApiDomain(url) {
  const domainReg = new RegExp("^http:\/\/apistore\.intra\.(sit\.|test\.)?ffan\.net\/")
  const env = getDomainEnv()
  const domain =  (env === 'pub') ? 'http://apistore.ffan.net/' : 'http://apistore.intra.test.ffan.net/'
  return domain + url.replace(domainReg, "")
}
// 跳转到 apistore 的链接
export function getApiUrl(url) {
  const domainReg = new RegExp("^http:\/\/apistore\.intra\.(sit\.|test\.)?ffan\.net\/")
  const env = getDomainEnv()
  const domain =  (env === 'pub') ? 'http://apistore.ffan.net/' : 'http://apistore.intra.test.ffan.net/'
  return domain + url.replace(domainReg, "")
}
