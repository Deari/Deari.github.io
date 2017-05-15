const commonReg = new RegExp('\\.((test|sit|uat)\\.)?(ffan\\.(net|com))$')

export function getDomainEnv (url = location.host, reg = commonReg) {
  const host = url || location.host
  const domainTestResult = host.match(reg)
  return domainTestResult ? (domainTestResult[2] ? domainTestResult[2] : 'pub') : 'local'
}

function getReplaced (match) {
  switch (match) {
    case 'local':
      return 'sit.'
    case 'sit':
      return 'sit.'
    case 'uat':
      return 'uat.'
    case 'test':
      return 'test.'
    case 'pub':
      return ''
    default:
      throw new Error('not matched')
  }
}

export function getDomain(url = '', option = {}) {
  const _opt = Object.assign({ suffix: 'net', host: location.host }, option)
  return `http://api.${getReplaced(getDomainEnv(_opt.host))}ffan.${_opt.suffix}${url}`
}

export function getEnvDomain () {
  return getDomainEnv() === 'pub' ? 'http://api.ffan.net' : 'http://api.sit.ffan.net'
}

export function getXapiComDomain () {
  return getDomainEnv() === 'pub' ? 'http://api.ffan.com' : 'http://api.sit.ffan.com'
}