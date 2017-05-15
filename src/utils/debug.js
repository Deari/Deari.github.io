export const warn = (msg, data) => {
  (data && alert(`${msg}:` + JSON.stringify(data))) || alert(`${msg}`)
  console.warn(`${msg}:`, data)
}

export const info = (msg, data) => {
  console.info(msg, data)
}
export const getErrStatus = (status) => {
  if (status === 4000) {
    return '提交失败(错误码：4000)'
  } else if (status === 4002) {
    return '与市场中的名称重复，请重试(错误码：4002)'
  } else if (status === 4040 || status === 4041 || status === 4042 || status === 4043) {
    return '提交失败(错误码：' + status + ')'
  } else if (status === 5102) {
    return '上传失败(错误码：5102)'
  } else if (status === 4201 || status === 4202 || status === 4203) {
    return '登录超时，请重新登录(错误码：' + status + ')'
  } else if (status === 4301) {
    return '此权限暂未开放(错误码：4301)'
  } else {
    return '网络不稳定，请稍后重试(错误码：' + status + ')'
  }
}
export default {
  warn,
  info,
  getErrStatus
}
