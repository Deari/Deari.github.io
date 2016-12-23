export const validate = values => {
  const errors = {}
  if (!values.hardwareName) {
    errors.hardwareName = '产品名称不能为空'
  }
  if (!values.hardwareMode) {
    errors.hardwareMode = '产品型号不能为空'
  }
  if (!values.hardwareProducer) {
    errors.hardwareProducer = '生产厂家不能为空'
  }
  if (!values.sdkType) {
    errors.sdkType = 'SDK类型不能为空'
  }
  if (!values.os) {
    errors.os = '操作系统不能为空'
  }
  if (!values.hardwarePlatform) {
    errors.hardwarePlatform = '生产厂家不能为空'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  // if (!values.commType1) {
  //   errors.commType1 = '方案必填'
  // } else if (isNaN(Number(values.commType1))) {
  //   errors.commType1 = '只能填写数字'
  // } else if (Number(values.commType1) <= 0) {
  //   errors.commType1 = '大于0的正整数'
  // }
  return errors
}

export const warn = values => {
  const warnings = {}
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  return warnings
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values/*, dispatch */) => {
  console.log(values, '===');

  return sleep(1000) // simulate server latency
    .then(() => {
      if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
        throw { username: 'That username is taken' }
      }
    })
}

export const repeatCheck = (username) => {
  // return'Invalid';

   return sleep(1000) // simulate server latency
    .then(() => {
      if ([ 'john', 'paul', 'george', 'ringo' ].includes(username)) {
        throw { username: 'That username is taken' }
      }
    })
}