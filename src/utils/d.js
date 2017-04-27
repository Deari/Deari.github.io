const domainReg = new RegExp('open\\.((test|sit)\\.)?ffan\\.net')
const domainXapiReg = new RegExp('xapi\\.intra\\.((test|sit)\\.)?ffan\\.net')
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
export function getDomainEnv(url, isApi) {
  const host = url || location.host
  const domainTestResult = host.match(isApi ? domainXapiReg : domainReg)
  if (!domainTestResult) {
    return 'local'
  }

  if (domainTestResult[ 2 ]) {
    return domainTestResult[ 2 ]
  } else {
    return 'pub'
  }
}


export function getEnvDomain() {
  return getDomainEnv() === 'pub' ? 'http://api.ffan.net' : 'http://api.sit.ffan.net'
}

export function getXapiComDomain () {
  return getDomainEnv() === 'pub' ? 'http://api.ffan.com' : 'http://api.sit.ffan.com'
}