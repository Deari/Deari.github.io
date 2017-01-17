import "./validate.scss"

export const validate = values => {
  const errors = {}
  console.log("validate values ", values)
  if (!values.appName) {
    errors.appName = <i className="message">请输入组件名称</i>
  }
  if (!values.size) {
    errors.size = <i className="message">请选择尺寸</i>
  }
  if (!values.appPreviewImage) {
    errors.appPreviewImage = <i className="message">请选择浏览图</i>
  } 
  if (!values.appLogo) {
    errors.appLogo = <i className="message">请选择组件图片</i>
  } 
  if (!values.appDesc) {
    errors.appDesc = <i className="message">请输入组件简介</i>
  } 
  if (parseInt(values.categoryId) == -1) {
    errors.categoryId = <i className="message">请选择分类</i>
  }
  if (values.tags && values.tags.length == 0) {
    errors.tags = <i className="message">请选择标签</i>
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