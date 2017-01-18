import "./validate.scss"

export const validate = values => {
  const errors = {}
  console.log("values ", values)
  const majorCategoryId = values.category ? parseInt(values.category.majorCategoryId) : -1
  const minorCategoryId = values.category ? parseInt(values.category.minorCategoryId) : -1

  if (!values.hardwareName) {
    errors.hardwareName = <i className="message">请输入硬件名称</i>
  }
  if (!values.hardwareLogo) {
    errors.hardwareLogo = <i className="message">请选择LOGO</i>
  } 
  if (!values.hardwareFunction) {
    errors.hardwareFunction = <i className="message">请输入硬件介绍</i>
  } 
  if ( majorCategoryId == -1 || minorCategoryId == -1) {
    errors.category = <i className="message">请选择分类</i>
  }
  if (values.tags && values.tags.length == 0) {
    errors.tags = <i className="message">请选择标签</i>
  }
  if (!values.hardwareMode) {
    errors.hardwareMode = <i className="message">请输入硬件型号</i>
  } 
  if (!values.hardwareProducer) {
    errors.hardwareProducer = <i className="message">请输入生产厂家</i>
  } 
  if (parseInt(values.sdkType) == -1) {
    errors.sdkType = <i className="message">请选择SDK类型</i>
  }
  if (parseInt(values.os) == -1) {
    errors.os = <i className="message">请选择操作平台</i>
  }
  if (parseInt(values.hardwarePlatform) == -1) {
    errors.hardwarePlatform = <i className="message">请选择硬件平台</i>
  }

  if (values.hardwarePics && values.hardwarePics.length == 0) {
    console.log(values.hardwarePics, "====");

    errors.hardwarePics = <i className="message">请选择硬件图片</i>
  } 
  if (!values.hardwareBrand) {
    errors.hardwareBrand = <i className="message">请输入硬件品牌</i>
  } 
  if (!values.hardwareDetail) {
    errors.hardwareDetail = <i className="message">请输入功能描述</i>
  } 
  if (!values.hardwareReport) {
    errors.hardwareReport = <i className="message">请选择测试报告</i>
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