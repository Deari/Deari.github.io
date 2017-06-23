const commonReg = new RegExp('\\.((test|sit|uat)\\.)?(ffan\\.(net|com))$')

export function getDomainEnv (url = location.host, reg = commonReg) {
  const host = url || location.host
  const domainTestResult = host.match(reg)
  return domainTestResult ? (domainTestResult[2] ? domainTestResult[2] : 'pub') : 'local'
}

function getReplaced (match, intra=false) {

  switch (match) {
    case 'local':
      return intra ? 'intra.sit.' : 'sit.'
    case 'sit':
      return intra ? 'intra.sit.' : 'sit.'
    case 'uat':
      return intra ? 'intra.uat.' : 'uat.'
    case 'test':
      return intra ? 'intra.test.' : 'test.'
    case 'pub':
      return ''
    default:
      throw new Error('not matched')
  }
}

export function getDomain(url = '', option = {}) {
  const _opt = Object.assign({ prefix: 'api', suffix: 'net', intra: false, host: location.host }, option)
  const env = getReplaced(getDomainEnv(_opt.host), _opt.intra);
  return `http://${_opt.prefix}.${env}ffan.${_opt.suffix}${url}`
}

export function getApiStoreDomain (url) {
  return getDomain(url, {
    prefix: 'apistore', suffix: 'net', intra: true
  })
}

export function getLoginDomain (url) {
  return getDomain(url, {
    prefix: 'passport', suffix: 'net', intra: true
  })
}

export function getSourceVal (name) {
  const pathName = name || location.pathname

  if (pathName.search(/apps/) != -1) return 1
  if (pathName.search(/widgets/) != -1) return 2
  if (pathName.search(/hardware/) != -1) return 4

  return 5
}

export function getDownloadDomain (url) {
  return getDomain(url, {
    prefix: 'fdfs', suffix: 'net', intra: true
  })
}