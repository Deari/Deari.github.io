export const validate = values => {
  const errors = {}
  if (!values.appName) {
    errors.appName = '请输入应用名称'
  }
  if (!values.appLogo) {
    errors.appLogo = '请选择应用图片'
  }
  if (!values.appDesc) {
    errors.appDesc = '请输入应用简介'
  }
  
  if (!values.tags || !values.tags.length) {
    errors.tags = '请选择标签'
  }

  if (!values.screenSize) {
    errors.screenSize = '请选择适配尺寸'
  }
  return errors
}
