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
    errors.screenSize = '请选择使用场景'
  }
  return errors
}

export const validateVersionForm = values => {
  const errors = {}
  if (!values.codeDesc) {
    errors.codeDesc = '版本介绍不能为空'
  }
  if (!values.codeVersion) {
    errors.codeVersion = '版本号不能为空'
  }
  if (typeof values.autoPublish === undefined) {
    errors.autoPublish = '请选择版本发布方式'
  }
  
  if(+values.appKind === 1) {
    if (!values.fileLink) {
      errors.fileLink = '请输入应用网址'
    }
  }

  if(+values.appKind === 0 || +values.appKind === 2) {
    if(values._files && !values._files.fileLink) {
      errors._files = '请上传符合规范的应用文件包'
    }
  }
  return errors
}
