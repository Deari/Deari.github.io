import "./validate.scss"

export const validate = values => {
  const errors = {}
  if (!values.appName) {
    errors.appName = <i className="message">请输入APP名字</i>
  }
  if (!values.appDesc) {
    errors.appDesc = <i className="message">请输入APP简介</i>
  } 
  if (!values.categoryId) {
    errors.categoryId = <i className="message">请选择</i>
  }
  if(!values.codeDesc){
    errors.codeDesc = <i className="message">请输入版本介绍</i>
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