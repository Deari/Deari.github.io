export const validate = values => {
  const errors = {}
  if (!values.appName) {
    errors.appName = '请输入组件名称'
  }
  if (!values.appLogo) {
    errors.appLogo = '请选择组件图片'
  }
  if (!values.appPreviewImage) {
    errors.appPreviewImage = '请选择预览图'
  }
  if (!values.appDesc) {
    errors.appDesc = '请输入组件简介'
  }

  if (!values.defaultLayout) {
    errors.defaultLayout = '请选择尺寸'
  }
  
  if (!values.tags || !values.tags.length) {
    errors.tags = '请选择标签'
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
      errors.fileLink = '请输入组件网址'
    }
  }

  if(+values.appKind === 0 || +values.appKind === 2) {
    if(values._files && !values._files.fileLink) {
      errors._files = '请上传符合规范的组件文件包'
    }
  }
  return errors
}
