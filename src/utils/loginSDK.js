// 用来简单判断登录状态
export default {
  // getStatus方法需传两个参数，第一个是回调方法，第二个是接口路径，第三个是登录地址，第四个是若未登录成功后跳转地址
  // 接口路径不传默认是test环境http://passport.intra.test.ffan.net/passport/session-check.json
  // http://passport.intra.sit.ffan.net/passport/session-check.json
  // 正式环境http://passport.ffan.net/passport/session-check.json
  //loginurl登录页面的地址 测试环境http://apistore.intra.test.ffan.net/#!/login/ sit环境http://apistore.intra.sit.ffan.net/#!/login/  正式环境http://apistore.ffan.net/#!/login/
  // callbackurl 若未登录，跳转登录页面登录成功后跳回的页面
  //callback的函数我会传入一个参数，退出成功为true，退出失败为false
  // 例如  getStatus(function(status, data){
  // status 未登录成功false。登录成功 true
  //  if(status){
  //     已登录data为接口返回信息
  //
  // } else{
  //    未登录data为null
  // }
  // }, 'http://passport.intra.test.ffan.net/passport/session-remove.json')
  // 注意loginurl和callbackurl两个参数不传只返回用户是否登录状态
  // 若四个参数都传，若用户已登录，则执行回调，若未登录，不执行回调，直接跳转登录页面，若用户登录成功，跳转到callbackurl页面
  getStatus (callback, url, loginurl, callbackurl) {
    let passportUrl = ''
    if (url != undefined) {
      passportUrl = url
    } else {
      passportUrl = 'http://passport.intra.test.ffan.net/passport/session-check.json'
    }
    let cookie = document.cookie
    if (cookie == '' && cookie == undefined) {
      // 若读不到cookie，则认为用户未登录
      if (callback != undefined) {
        if (callbackurl != undefined && loginurl != undefined) {
            window.location.href = loginurl + '&callbackurl=' + callbackurl
        } else {
          callback(false,null)
        }
      }
    } else {
      if (cookie.indexOf('WG-PPC-MIX') != -1) {
        let postData = {}
        let myHeaders = new Headers()
        window.fetch(passportUrl, {
                method: 'POST',
                headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
                mode: 'cors',
                cache: 'default',
                credentials: 'include',
                body: JSON.stringify(postData)
        }).then(function(response){
          if (response.status == 200) {
            response.json().then(function(rest){
              if (rest.status == 200) {
                // 若用户已登录，则储存用户信息
                if (callback != undefined) {
                  callback(true,rest.attachment)
                }
              } else {
                if (callback != undefined) {
                  if (url != undefined && loginurl != undefined) {
                      window.location.href = loginurl + '&callbackurl=' + callbackurl
                  } else {
                    callback(false,null)
                  }
                }
              }
            })
          } else {
            if (callback != undefined) {
              callback(false,null)
            }
            window.alert('网络连接失败，请检查您的网络重试')
          }
        })
      } else {
        // 若读不到mix信息，则认为用户未登录
        if (callback != undefined) {
          if (url != undefined && loginurl != undefined) {
              window.location.href = loginurl + '&callbackurl=' + callbackurl
          } else {
            callback(false,null)
          }
        }
      }
    }
    // 若存在callbackurl,则若未登录跳转登录页面
  },
  // quit方法需传两个参数，第一个是回调方法，第二个是接口路径，接口路径不传默认是test环境http://passport.intra.test.ffan.net/passport/session-remove.json
  // http://passport.intra.sit.ffan.net/passport/session-remove.json
  // 正式环境http://passport.ffan.net/passport/session-remove.json
  //callback的函数我会传入一个参数，退出成功为true，退出失败为false
  // 例如  quit(function(status){
  // status 退出失败时false。退出成功时 true
  //  if(status){
  //    成功做的事
  // } else{
  //    失败事
  // }
  // }, 'http://passport.intra.test.ffan.net/passport/session-remove.json')
  quit (callback, url) {
    let myHeaders = new Headers()
    let postData = {}
    let passportUrl = ''
    if (url != undefined) {
      passportUrl = url
    } else {
      passportUrl = 'http://passport.intra.test.ffan.net/passport/session-remove.json'
    }
    window.fetch(passportUrl, {
            method: 'POST',
            headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},
            mode: 'cors',
            cache: 'default',
            credentials: 'include',
            body: postData
    }).then(function(response){
      if (response.status == 200) {
        response.json().then(function(rest){
          if (rest.status == 200) {
           if (callback != undefined) {
             callback(true)
           }
           window.alert('成功退出')
          } else {
            if (callback != undefined) {
              callback(false)
            }
            window.alert('退失败')
          }
        })
      } else {
        if (callback != undefined) {
          callback(false)
        }
        window.alert('网络连接失败，请检查您的网络重试')
      }
    })
  }
}