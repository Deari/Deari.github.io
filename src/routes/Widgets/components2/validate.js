export const validate = (values, props) => {
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

function compareVersion(v1=[], v2=[]) {
  for(let i=0; i<v1.length; i++) {
    if(v1[i] == v2[i]){
      continue;
    }
    return v1[i] > v2[i];
  }
}

export const validateVersionForm = (values, props) => {
  const errors = {}
  if (!values.codeDesc) {
    errors.codeDesc = '版本介绍不能为空'
  } else if (values.codeDesc.length > 4000) {
    errors.codeDesc = 版本介绍内容长度不能大于4000字
  }

  if (!values.codeVersion) {
    errors.codeVersion = '版本号不能为空'
  } else {
    const _version = values.codeVersion.trim();
    if (!/^\d+\.\d+\.\d+$/.test(_version)) {
      errors.codeVersion = '您输入的版本格式有误';
    }
    if(props.onlineVersion) {
      const _t = props.onlineVersion.split('.');
      const _s = _version.split('.');
      
      if(!compareVersion(_s, _t)){
        errors.codeVersion = '新版本须大于老版本';
      }
    }
  }

  if (typeof values.autoPublish === undefined) {
    errors.autoPublish = '请选择版本发布方式'
  }
  
  if(+values.appKind === 1) {
    if (!values.fileLink) {
      errors.fileLink = '请输入组件网址'
    }
    if(!/^https?:\/\/\S+\.\S+/.test(values.fileLink.trim())) {
      errors.fileLink = '请输入正确的网址，以（http:// 或 https://）开头'
    }
  }

  if(+values.appKind === 0 || +values.appKind === 2) {
    if(values._files && !values._files.fileLink) {
      errors._files = '请上传符合规范的组件文件包'
    }
  }
  return errors
}
