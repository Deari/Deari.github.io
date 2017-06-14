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
    } else if(props.onlineVersion) {
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
      errors.fileLink = '请输入应用网址'
    }

    if(!/^https?:\/\/\S+\.\S+/.test(values.fileLink.trim())) {
      errors.fileLink = '请输入正确的网址，以（http:// 或 https://）开头'
    }
  }

  if(+values.appKind === 0 || +values.appKind === 2) {
    if(values._files && !values._files.fileLink) {
      errors._files = '请上传符合规范的应用文件包'
    }
  }
  return errors
}
