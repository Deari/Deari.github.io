import './validate.scss'

export const validate = values => {
  const errors = {}
  if (!values.appName) {
    errors.appName = <i className='message-info'>请输入应用名称</i>
  }
  if (values.autoPublish != 0 && values.autoPublish != 1) {
    errors.autoPublish = <i className='message-info'>请选择发布方法</i>
  }
  if (parseInt(values.codeVersion) == -1) {
    errors.codeVersion = <i className='message-info'>请选择版本号</i>
  }
  if (!values.appLogo) {
    errors.appLogo = <i className='message-info'>请选择应用图片</i>
  }
  if (!values.appDesc) {
    errors.appDesc = <i className='message-info'>请输入应用简介</i>
  }
  if (parseInt(values.categoryId) == -1) {
    errors.categoryId = <i className='message-info'>请选择分类</i>
  }
  if (values.tags && values.tags.length == 0) {
    errors.tags = <i className='message-info'>请选择标签</i>
  }
  
  if (!values.codeDesc) {
    errors.codeDesc = <i className='message-info'>请输入版本介绍</i>
  }
  if (values.codeDesc && values.codeDesc.length > 4000) {
    errors.codeDesc = <i className='message-info'>版本介绍内容长度不能大于4000字</i>
  }

  if (values.appKind === 0) {
    if(values.file && !values.file.fileLink && !values.file.url) {
      errors.file = <i className='message-info'>请上传fap应用文件</i>
    }
  }
  if (values.appKind === 1) {
    let regExp = new RegExp(/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/)
    if (!values.fileLink) {
      errors.fileLink = <i className='message-info'>请输入网址</i>
    } else if (!regExp.test(values.fileLink)) {
      errors.fileLink = <i className='message-info'>请输入正确的网址，以（http:// 或 https://）开头</i>
    }
  }
  if (values.appKind === 2) {
    if(values.fileObj && !values.fileObj.fileLink && !values.fileObj.url) {
      errors.fileObj = <i className='message-info'>请上传APK文件</i>
    }
  }

  if(!values.screenSize) {
    errors.screenSize = <i className='message-info'>请选择使用场景</i>
  }

  return errors
}

export const warn = values => {
  const warnings = {}
  // if (values.age < 19) {
  //   warnings.age = 'Hmm, you seem a bit young...'
  // }
  return warnings
}

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// export const asyncValidate = (values/*, dispatch */) => {
//   console.log(values, '===');

//   return sleep(1000) // simulate server latency
//     .then(() => {
//       if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
//         throw { username: 'That username is taken' }
//       }
//     })
// }

// export const repeatCheck = (username) => {
//   // return'Invalid';

//    return sleep(1000) // simulate server latency
//     .then(() => {
//       if ([ 'john', 'paul', 'george', 'ringo' ].includes(username)) {
//         throw { username: 'That username is taken' }
//       }
//     })
// }
