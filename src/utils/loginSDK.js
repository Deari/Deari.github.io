// 用来简单判断登录状态
export default {
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
          window.localStorage.loginCBurl = callbackurl
          window.location.href = loginurl
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
                body: postData
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
                    window.localStorage.loginCBurl = callbackurl
                    window.location.href = loginurl
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
            window.localStorage.loginCBurl = callbackurl
            window.location.href = loginurl
          } else {
            callback(false,null)
          }
        }
      }
    }
    // 若存在callbackurl,则若未登录跳转登录页面
  },
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
