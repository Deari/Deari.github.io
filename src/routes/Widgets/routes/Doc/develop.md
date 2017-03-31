# 开始前必读

## 首页

### 蓝海开放平台概述

蓝海开放平台是开发者通过应用、组件、硬件为蓝海商家和蓝海顾客，提供服务的平台，而蓝海开放平台API市场中的接口则是提供服务的基础，开发者在蓝海开放平台中获取API接口权限后，可以通过阅读本接口文档来帮助开发出蓝海商家需要的应用、组件、硬件。

### 服务人群

开发者主要服务于两类人群，一类是蓝海商家，一类是蓝海顾客。

什么是蓝海商家。蓝海开放平台为商家提供的客户端，商家通过使用蓝海开放平台【应用市场】中的应用，管理自己的会员、营销、交易、商品、对账等数据；通过使用【组件市场】中的组件，为自己的网上店铺进行装修，组件是店铺中的一个一个的展示单位，配置组件信息，保存并发布后，蓝海顾客可以看到相应的信息；通过使用【硬件市场】中的硬件，完成自己的线下业务，如收银POS机、打印机、WiFi探针等。市场中的应用、组件、硬件，均由开发者提供。

什么是蓝海顾客。蓝海开放平台为顾客提供的客户端，或者其他客户端嵌入蓝海开放平台的SDK，顾客可以使用蓝海商家在【店铺装修】中配置的组件。如领取会员卡、进行抽奖。

为了识别蓝海商家中的员工，每个员工针对每个商家，会产生一个安全的wID。开发者在使用API的官方接口时，都需要传递wID。

为了识别蓝海顾客中的会员，每个会员针对每个商家，会产生一个安全的openID。开发者在使用API的官方接口时，都需要传递openID。

 - 开发者注意

> 1、蓝海开放平台开发是指为蓝海商家进行业务开发，为移动应用、PC端网站、硬件的开发。

> 2、在进行开发时，你可以先通过测试号申请系统，快速申请一个接口测试号，立即开始接口测试开发。

> 3、在开发过程中，可以使用接口调试工具来在线调试某些接口。

> 4、每个接口都有每日接口调用频次限制，可以在蓝海开放平台-开发者中心处查看具体频次。

> 5、在开发出现问题时，可以通过接口调用的返回码，以及报警排查指引（在蓝海开放平台-开发者中心处可以设置接口报警），来发现和解决问题。

> 6、公众平台以access_token为接口调用凭据，来调用接口，所有接口的调用需要先获取access_token，access_token在2小时内有效，过期需要重新获取，但1天内获取次数有限，开发者需自行存储，详见获取接口调用凭据（access_token）文档。

> 7、蓝海开放平台的API接口调用仅支持80端口。

## 开发者规范
 - 涉及用户数据时
您的服务需要收集用户任何数据的，必须事先获得用户的明确同意，且仅应当收集为运营及功能实现目的而必要的用户数据，同时应当告知用户相关数据收集的目的、范围及使用方式等，保障用户知情权。
您收集用户的数据后，必须采取必要的保护措施，防止用户数据被盗、泄漏等。

 您在特定蓝海商家中收集的用户数据仅可以在该特定蓝海商家中使用，不得将其使用在该特定蓝海商家之外或为其他任何目的进行使用，也不得以任何方式将其提供给他人。

 如果蓝海开放平台认为您收集、使用用户数据的方式，可能损害用户体验，蓝海开放平台有权要求您删除相关数据并不得再以该方式收集、使用用户数据。

 一旦您停止使用本服务，或蓝海开放平台基于任何原因终止您使用本服务，您必须立即删除全部因使用本服务而获得的数据（包括各种备份）， 且不得再以任何方式进行使用。

 - 其他规范：
请勿为任何用户自动登录到蓝海开放平台提供代理身份验证凭据。

 请勿提供跟踪功能，包括但不限于识别其他用户在个人主页上查看、点击等操作行为。

 请勿自动将浏览器窗口定向到其他网页。

 请勿设置或发布任何违反相关法规、公序良俗、社会公德等的玩法、内容等。

 请勿公开表达或暗示，您与蓝海开放平台之间存在合作关系，包括但不限于相互持股、商业往来或合作关系等，或声称蓝海开放平台对您的认可。

 完整的开发者规范和接口限制，请详见开发者接口文档，以及蓝海开放平台开发者协议。
 
## 开发流程概述

### 注册

您需要打开开发者平台首页,点击右上角[注册][1]按钮,填写相关信息注册为开发者。

### 创建新组件

- 点击页面左侧的[创建新组件][2]
- 选择创建新应用的类型。应用类型包括FAP小程序、HTML5。

### 开发、打包、调试

#### Android开发者
- 开发FAP小程序类型的应用

#### iOS开发者
- 开发FAP小程序类型的应用

#### H5开发者
- 开发HTML5类型的应用

### 审核

 1. 登录开发者平台首页,点击组件市场->我的组件->发布新版本,并上传应用文件（如:应用名.fap）或HTML5链接。
 2. 填写版本号, 版本号采用标准三段式, 如: 1.0.0。
 3. 填写版本简介, 字数请限制在 120 字内。
 4. 提交审核（审核规则待补充）。

### 发布

 1. 组件审核通过后, 可以在 我的组件->已审核 中查看。
 2. 点击发布, 会上架到组件市场。

[1]: http://apistore.intra.ffan.net/#/register
[2]: http://open.ffan.net/widgets/create

# Android开发者

## 集成
1. 下载安装[Android Studio](https://developer.android.com/studio/index.html)
2. 下载安装[JDK](http://www.oracle.com/technetwork/java/javase/archive-139210.html)
3. 安装Android SDK：
打开Android Studio打开设置，如下图所示:
![Alt text](http://img1.ffan.com/T18PWTBgDj1RCvBVdK)
在设置选项中选择System Setting中的Android SDK选择下载安装
![Alt text](http://img1.ffan.com/T1wPATB4ds1RCvBVdK)
4. 安装React-Native环境[官方文档](http://facebook.github.io/react-native/docs/getting-started.html)
```bash
# 1. 安装 brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 2. 安装 node
brew install node
# 3. 安装 watchman
brew install watchman
# 4. 安装 react-native
npm install -g react-native-cli
```
5. 下载[ffoap sdk](http://static.ffan.com/bo/ffoap_sdk_Android_v0.2.0.zip)并导入到Android Studio中

## 开发简易说明

### 一、开发目录

1. 目录结构图：
![Alt text](http://img1.ffan.com/T1iPLTBQdQ1RCvBVdK)
2. 配置文件说明：
App Config 文件放在 app 的根目录下, 文件名为 config.json, 文件内容是一个 json 串。格式如下:
```javascrpit
{
  "index": "xxxxxx",
  "name": "xxxxxx",
  "moduleName":"xxxxxx",
  "platform": 2,
  "rnFrameworkVersion": 1,
  "version": "0.0.1",
  "icon": "xxxxxx"
}
```

字段说明如下表所示：

| 字段      |描述 |   
| :-------- | --------:| 
| index    |   app入口文件路径(相对路径), 如"test/index.js" |  
| name    |   app名称 |   
| platform    |平台类型（int值） ios:1, Android:2，ios&Android:3 |  
| rnFrameworkVersion     |   ffoap框架版本号 |  
| version    |   app版本号 |  

### 二、配置
> 在demo工程中的MyConfig Java类中对相应的配置进行修改

```java
public class MyConfig extends DefaultConfig {
    //本地调试模式开关
    public boolean isLocalDebugMode() {
        return false;
    }
  //FAP小程序入口文件路径
    public String getRNDebugIndexJsPath() {
        return "FFOAP/applications/applists";
    }
    //FAP小程序入口文件ModuleName
    public String getRNDebugModuleName() {
        return "template";
    }
  //调试bundle包在手机中的绝对路径
    public String getRNDebugBundlePath() {
        return Environment.getExternalStorageDirectory() + File.separator + "1.b";
    }
  //渠道id
    public String getChannelId() {
        return "3";
    }
  //Android组件id
    public String getAppId() {
        return "1";
    }
  //Android组件版本
    public String getAppVersion() {
        return "1.0.0.0";
    }
  //调试H5页面地址
    public String getDebugHtmlPage() {
        return "www.baidu.com";
    }
  //调试ffoap app类型
    public AppType getDebugAppType() {
        return AppType.APK;
    }
  //调试apk路径
    public String getDebugApkPath() {
        return Environment.getExternalStorageDirectory() + File.separator + "toutiao.apk";
    }
}
```
### 三、调试
1.  修改Demo 工程的MyConfig类修改调试ffoap app类型
2.  如果是FAP小程序类型，进入工程目录中的 js_module 目录, 运行 npm start 或者 react-native start, 开启服务，即可进行正常调试。
3.  在手机FAP小程序界面中摇一摇或者按手机硬件menu键，启动FAP小程序调试界面。如下图：
![Alt text](http://img1.ffan.com/T1lSETBbAg1RCvBVdK)
4.  进入开发选项，选择端口设置，查看电脑ip地址，设置为ip地址加8081端口。如下图：
![Alt text](http://img1.ffan.com/T1cGbTBKZs1RCvBVdK)![Alt text](http://img1.ffan.com/T1OPLTBmAQ1RCvBVdK)
5.  电脑端安装chrome浏览器，在手机FAP小程序界面中摇一摇或者按手机硬件menu键，启动FAP小程序调试界面，选择start remote JS debuging，如图：
![Alt text](http://img1.ffan.com/T1lSETBbAg1RCvBVdK)
电脑端chrome会自动开启debug页面，选择开发者工具查看log信息等。开发者可以在手机FAP小程序开发者选项中开启enable live reload，这样一旦更改了JS端的代码就不用选择reload就可以实时看到界面的变化。

## 接口说明

[接口说明](http://wiki.ffan.biz/pages/viewpage.action?pageId=14247674)

# HTML5开发者

## JSSDK使用文档

**概述:**

- `JS-SDK` 是飞凡网内部向网页开发者提供的网页开发工具包

- 通过使用 `JS-SDK`, 网页开发者可借助 `js-bridge` 调用手机等设备的功能

- 此文档面向网页开发者介绍 `JS-SDK` 如何使用及相关注意事项

**JSSDK使用步骤:**

### 步骤一: 引入JS文件

在需要调用JS接口的页面引入JS文件，（支持https）：
> http://nres.ffan.com/newactivity/ffan-bo-jssdk-0.0.3.min.js

### 步骤二: 通过 `config` 接口注入权限验证配置

<p><font color=red>所有需要使用JS-SDK的页面必须先注入配置信息, 到后台去进行验证, 否则无法调用</font></p>

```javascript
// 检验必传参数 config
ffanSDK.config({
    appKey："66f6a62fa73ad8c961e121efe695fea2",  //第三方应用appKey
    ts："1486628893",  //签名时使用的时间戳
    nonceStr："XX4L3FX6vgorRFf3lklnP8Cp",  //用来生成签名的随机串
    signature："c3f94fa5ea84885eda0ab7c2cf350fa428cd2b3a",  //生成的签名
    url : "http%3A%2F%2Flocal.xa.com",  //当前页面的url 请使用urlEncode对url进行处理
});
```

### 步骤三: 通过 `ready` 接口处理成功验证

```javascript
// 验证通过 ready 函数
ffanSDK.ready(function(sdk) {
  // config 信息验证通过后会执行 ready 方法
});
```

### 步骤四: 通过 `error` 接口处理失败验证

```javascript
// 校验失败的 error 函数
ffanSDK.error(function(res) {
  // config 信息验证失败会执行 error 函数
  // 如签名过期导致验证失败, 具体错误信息可以打开 config 的 debug 模式查看
  // 也可以在返回的 res 参数中查看, 对于 SPA 可以在这里更新签名
});
```

**接口调用说明:**

<p><font color=red>所有接口通过 `ready` 中返回的参数 `sdk` 来调用, 参数是一个对象, 目前提供以下方法:</font></p>

**openWebPage**

- 功能描述: 通过 `H5` 打开一个新的 `WebView` 去加载新的 `H5` 页面

- 方法名称: sdk.openWebPage

- 参数定义: 参数为一个 `JSON` 对象

  * **url** 新的 `H5` 页面地址

```javascript
sdk.openWebPage({"url":"www.baidu.com"})
```

**closeWindow**

- 功能描述: 通过 `H5` 关闭一个 `WebView`中的`H5` 页面

- 方法名称: sdk.closeWindow

```javascript
sdk.closeWindow()
```

**openLocalRNPage**

- 功能描述: 通过H5打开一个新的 `WebView` 去打开一个本地 `React Native` 页面

- 方法名称: sdk.openLocalRNPage

- 参数定义: 参数为一个 `JSON` 对象

  * **moduleName** 要打开的 `FAP小程序` 模块名称

  * **path** `FFOAP` 内 `FAP小程序` 入口文件的相对路径

```javascript
sdk.openLocalRNPage({"moduleName":"test", "path":"FFOAP/applications/applists.ios"})
```

**getDevInfo** 获取设备信息

- 功能描述: `H5` 页面通过 `JSBridge` 获取设备信息

- 方法名称: sdk.getDevInfo

- 参数定义: 空

```javascript
sdk.getDevInfo()
  .then(function(data) {
    // success
    // data格式为
    {
      name:'iOS_Wifi', //设备名称
      model:'营销', //设备类型
      systemVersion:'1.0.0', //系统版本
    }
  }).catch(function(err) {
    // fail
  })
```

**getEnvInfo** 获取启动参数

- 功能描述: `H5` 页面通过 `JSBridge` 获取启动参数

- 方法名称: sdk.getEnvInfo

- 参数定义: 空

- 返回值: 返回值为一个 `JSON` 对象, 其返回值为当前获取启动参数

```javascript

sdk.getEnvInfo({fn:'getLaunchParams',fnParams:{'bar':'foo'}})
  then(function(data){
    {
    // success
    // data格式为启动之前传递的参数
      "storeName":"GAP",
      "org":"wanda",
      "storeId":"10000",
      "token":"8943o9432943948394839",
      "userId":"18510000005"
    }
  }).catch(function(err){
    //fail
  })
```

**getLocation** 获取位置信息

- 功能描述: `H5` 页面通过 `JSBridge` 获取位置信息

- 方法名称: sdk.getLocation

- 参数定义: 空

- 返回值: 返回值为一个 `JSON` 对象, 其返回值为当前位置的坐标

```javascript
sdk.getLocation()
  .then(function(data) {
    // success
    // data格式为
    {
      lot:'116.46', //经度
      lat:'39.92', //维度
    }
  }).catch(function(err) {
    // fail
  })
```

**setTitle** 设置标题

- 功能描述: `H5` 页面通过 `JSBridge` 设置标题

- 方法名称: sdk.setTitle

- 参数定义: 参数为一个 `JSON` 对象

  * **title** 标题的名称

```javascript
sdk.setTitle({"title":"飞凡demo"})
```

**setRightNavBarItem** 设置右导航图标（分享）的显隐

- 功能描述: `H5` 页面通过 `JSBridge` 设置 `navigationBar` 右边导航图标显示/隐藏(目前只限一个)

- 方法名称: sdk.setRightNavBarItem

- 参数定义: 参数为一个 `JSON` 对象

  * **title** 为分享图标的文案, 如果 `title` 内容为空则不显示右导航图标

```javascript
sdk.setRightNavBarItem({"title":"分享"})
```

## H5授权接口说明

###  **`accessToken` 说明**

- `accessToken` 是开放平台的全局唯一票据, 第三方应用调用各接口时都需使用 `accessToken`。开发者需要进行妥善保存

- `accessToken` 的存储至少要保留 512 个字符空间

- `accessToken` 的有效期目前为 7200 秒, 需定时刷新, 重复获取将导致上次获取的 `accessToken` 失效

**开放平台的API调用所需的 `accessToken` 的使用及生成方式说明**

  * **中控服务器**. 为了保密 `appSecrect`, 第三方需要一个 `accessToken` 获取和刷新的中控服务器。而其他业务逻辑服务器所使用的 `accessToken` 均来自于该中控服务器, 不应该各自去刷新, 否则会造成 `accessToken` 覆盖而影响业务。

  * **刷新过程**. 目前 `accessToken` 的有效期通过返回的 `expiresIn` 来传达, 目前是 7200 秒。中控服务器需要根据这个有效时间提前去刷新新 `accessToken`。在刷新过程中, 中控服务器对外输出的依然是老 `accessToken`, 此时开放平台后台会保证在刷新短时间内, 新老 `accessToken` 都可用, 这保证了第三方业务的平滑过渡。

  * **主动刷新,被动刷新**. `accessToken` 的有效时间可能会在未来有调整, 所以中控服务器不仅需要内部定时主动刷新, 还需要提供被动刷新 `accessToken` 的接口, 这样便于业务服务器在 `API` 调用获知 `accessToken` 已超时的情况下, 可以触发 `accessToken` 的刷新流程。

**获取资源接口调用凭证【accessToken】接口说明**

  - 请求样例

```bash
curl -X POST -d "appKey=bo8b4f85f3a794d99&appSecret=cd02f64be56af9a6603c4ad6858f5256" http://api.ffan.com/oauth/v1/token
```

  - 接口调用频率: 2000 次 / 天（ 00:00:00 - 23:59:59 ）

  - 参数说明

    * **appKey**: 第三方应用 `appKey`

    * **appSecret**: 第三方应用的的密钥

  - 返回值说明

```
// 成功:
{
  "status": 200  // int 型, 200 表示成功,
  "message": "ok"  // string 型,  对 status 的说明,
  "data":{
    "accessToken":"86f7e437faa5a7fce15d1ddcb9eaeaea377667b8"  // string 型 , 资源接口调用凭证
    "expiresIn":7200  // int 型 accessToken 的过期时间 单位秒
  }
}
```

```
// 失败:
{
  "status": 4000  // int 型, 4000 表示客户端错误, 5000 表示服务端内部错误 ,
  "message": "param error"  // string 型, 对 status 的文字描述
}
    ```

  - 错误码对照表


| 错误码 | 错误说明 |
| :--- | :----- |
| 4001 | appKey 参数错误 |
| 4002 | appSecret 参数错误 |
| 5001 | 服务器存储错误 |

### **`accessToken` 的签名说明**

**签名算法**

- 参与签名的字段: `accessToken`（资源调用凭证）、`appKey`（第三方应用的 appKey）、`nonceStr`（随机字符串）、`ts`（当前时间戳）、`url`（调用 JS 接口页面的完整 URL, 不包含 # 及其后面部分）

- 对所有待签名参数按照字段名的 `ASCII` 码从小到大排序（字典序）后, 使用URL键值对的格式（即 key1=value1&key2=value2…）拼接成字符串 `str1`

- 这里需要注意的是所有参数名均为小写字符。对 `str1` 作 `SHA256` 加密, 字段名和字段值都采用原始值, 不进行 `URL` 转义。
>>>>>>> sit

  <p><font color=red>注意: 出于安全考虑, 开发者必须在服务器端实现签名的逻辑</font></p>

- 签名算法示例

  1\. 待签名字段

```javascript
accessToken=1f7f568afa4204326fede5cc17472b8a535ca39f
appKey=3b997a1c75a61c26fd0576f814f51df6
nonceStr=abcdeaasdfasdf
ts=1486351078
url=http://m.ffan.com?a=b&c=d
```

  2\. 对所有待签名参数按照字段名的 `ASCII` 码从小到大排序（字典序）后, 使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串 `string1`

```javascript
accesstoken=1f7f568afa4204326fede5cc17472b8a535ca39f&appkey=3b997a1c75a61c26fd0576f814f51df6&noncestr=abcdeaasdfasdf&ts=1486351078&url=http://m.ffan.com?a=b&c=d
```

  3\. 对 `string1` 进行 `SHA256` 签名, 得到 `signature`

```
928dfbcabb55bc663a925306f11e2ab17c4a6d65
```

**验证accessToken的签名是否正确接口说明**

- 请求样例

```bash
curl -X GET http://api.ffan.com/oauth/v1/token/sign?appKey=bo8b4f85f3a794d99&ts=1484727098&nonceStr=asd1ada&signature=86f7e437faa5a7fce15d1ddcb9eaeaea377667b7&url=http%3A%2F%2Fm.ffan.com%3Fa%3Db%26c%3Dd
```

- 接口调用频率: 200000 次 / 天（00:00:00 - 23:59:59）

- 参数说明

  * **appKey**: 第三方应用 appKey

  * **ts**: 签名时使用的时间戳

  * **nonceStr**: 用来生成签名的随机串

  * **signature**: 生成的签名

  * **url** : 调用 `JS` 接口页面的完整 `URL`, 不包含 # 及其后面部分,  <font color=red>请使用 `urlEncode` 对 url 进行处理</font>

- 返回值说明

```
// 成功:
{
  "status": 200  // int 型 表示签名验证成功,
  "message": "ok"
}
```

```
// 失败:
{
  "status": 4000  // int 型 表示签名验证失败 4000 表示客户端参数错误 5000 表示服务端内部错误
  "message": "param error"  // string 型, 具体的错误信息
}
```

- 错误码对照表:

| 错误码 | 错误说明 |
| :--- | :----- |
| 4001 | appKey 参数错误 |
| 4004 | accessToken 参数错误 |
| 4005 | nonceStr 参数错误 |
| 4006 | url 参数错误 |
| 4007 | ts 参数错误 |
| 4010 | 签名参数错误或者签名无效 |

**生成 `accessToken` 的签名接口说明**

<p><font color=red>注意: 此接口仅仅是为了方便开发者调试签名, 实际业务中请第三方应用在自己的服务端实现签名逻辑</font></p>

- 请求样例

  ```bash
  curl  -X POST -d "accessToken=86f7e437faa5a7fce15d1ddcb9eaeaea377667b8&appKey=bo8b4f85f3a794d99&nonceStr=asd1ada&ts=1484727098&url=http%3A%2F%2Fm.ffan.com%3Fa%3Db%26c%3Dd" http://api.ffan.com/oauth/v1/token/sign
  ```

- 接口调用频率: 200 次 / 天（00:00:00 - 23:59:59）

- 参数说明

  * `accessToken`: 资源接口的调用凭证

  * `appKey`: 第三方应用 appKey

  * `ts`: 签名时使用的时间戳

  * `nonceStr`: 用来生成签名的随机串

  * `url`: 调用 `JS` 接口页面的完整 `URL`, 不包含 # 及其后面部分,  <font color=red>请使用 `urlEncode` 对 url 进行处理</font>

- 返回值说明

```
// 成功:
{
  "data": {
    "signature": "86f7e437faa5a7fce15d1ddcb9eaeaea377667b7"  // string 型, 签名
  },
  "message": "ok",
  "status": 200  // int 型 200 表示成功
}
```

```
// 失败:
{
  "message": "param error"  // string 型,  具体的错误信息,
  "status": 4000  // int 型, 4000 表示客户端错误, 5000 表示服务端内部错误
}
```

- 错误码对照表:

| 错误码 | 错误说明 |
| :--- | :----- |
| 4001 | appKey 参数错误 |
| 4004 | accessToken 参数错误 |
| 4005 | nonceStr 参数错误 |
| 4006 | url 参数错误 |
| 4007 | ts 参数错误 |

# iOS开发者

## ReactNative部分

### FFOAP ReactNative App 概述

采用ReactNative动态化方案，编写JavaScript代码，通过JavaScriptCore映射成原生组件。获得原生应用体验。下文中ReactNative简称为FAP小程序。

### 搭建环境

#### iOS开发环境

XCode下载：[点击下载Xcode](https://itunes.apple.com/cn/app/xcode/id497799835?mt=12)

#### Mac FAP小程序开发环境

1. 安装Homebrew:
``` 
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. 安装Node : 使用Homebrew来安装node.js
```
brew install node 
```
安装完node后可以采用设置npm镜像，加速后面的过程 
```
npm config set registry https://registry.npm.taobao.org –global 
npm config set disturl https://npm.taobao.org/dist –global
```
参考链接：https://facebook.github.io/react-native/docs/getting-started.html
3. 安装react-native-cli: 用于创建、初始化、更新、打包等任务
```
npm install -g react-native-cli
```
4. 安装Watchman:packger可以快速捕捉文件的变化，从而实现实时刷新
```
brew install watchman
```
5. 安装cocoapods: 用于管理iOS库依赖
```
gem install cocoapods 建议通过安装cocoapods MacApp 自动安装
```
参考链接：https://cocoapods.org/
6. 其它工具:
> Sublime Text，Deco，WebStorm， nuclide

### 项目集成

#### 下载SDK（含Demo工程）

通过以下链接下载SDK和Demo：
[SDK下载](http://static.ffan.com/bo/iOS.ffoap-alpha.zip)

#### iOS FFOAPSDK介绍
##### FFOAPSDK结构

pod安装后效果如下：
![](http://img1.ffan.com/T1TIWTB_xj1RCvBVdK)

**按功能划分为以下几个部分**

**1. FAP小程序部分**

| 文件名      |   类型 |   功能 |
| :-------- | :--------| :--------|
| FFReactNativeController.h    | 头文件 | 承载FAP小程序页面的通用VC |

**2. Hybrid部分**

| 文件名      |   类型 |   功能 |
| :-------- | :--------| :--------|
| FFHybridViewController.h  | 头文件 | 承载webview的VC基类 |
| FFHybridWidget.h     | 头文件 | 供js调用的接口的抽象协议|
| FFHybridXXXWidget.h  | 头文件 | 实现FFHybridWidget协议的系列接口|

**3. 公用部分**

| 文件名      |   类型 |   功能 |
| :-------- | :--------| :--------|
| FFRoute.h    | 头文件 | 页面导航管理 |
| FFUtils.h     | 头文件 | 工具类，提供一些快捷方法|
| Fonts/* | 文件夹 | FAP小程序必要字体库。使用该字体，iOS需要配置工程中Info.plist的Fonts provided by application列表|
| Images/* | 文件夹 | 图片资源 |
| FFOAPSDKLib.podspec | 描述文件 | 描述FFOAPSDK库全部内容，供Podfile使用 |

#### 接入SDK

##### 添加SDK文件

将FFOAPSDK目录，node_modules目录，package.json，startServer拷贝到工程同级目录
![](http://img1.ffan.com/T1gwETBbAg1RCvBVdK)

##### 加载FAP小程序组件

执行 `npm install`，加载ReactNative组件

##### 编写Podfile

在同级目录下，创建纯文本文件Podfile内容如下：

``` objectivec
platform :ios, '8.0'
workspace 'FFOAPDemo'
target 'FFOAPDemo' do
    project 'FFOAPDemo'
    pod 'FFOAPSDKLib', :path => 'FFOAPSDK'
    pod 'React', :path => 'node_modules/react-native', :subspecs => [
    'Core',
    'CSSLayout',
    'RCTImage',
    'RCTNetwork',
    'RCTText',
    'RCTWebSocket',
    'RCTSettings',
    'RCTActionSheet',
    'RCTCameraRoll',
    'RCTGeolocation'
    ]
end
``` 

##### 安装Pod

工程根目录下，命令行执行`pod install --no-repo-update`
将FFOAPDemo与React和FFOAPSDK的依赖关系建立起来。
安装成功后，工程结构如下：
![](http://img1.ffan.com/T1sGLTBbZj1RCvBVdK)

##### 配置Info.plist
如下图所示，修改Info.plist，配置定位权限，访问相册权限和自定义字体
![](http://img1.ffan.com/T1wwJTBshg1RCvBVdK)

### 开发APP

以zhihu为例

1. 在工程同级目录下创建文件夹FFOAP/applications/zhihu
2. 在zhihu中添加js代码，完成FAP小程序 App开发
![](http://img1.ffan.com/T1tvVTBgbs1RCvBVdK)

3. 修改native代码，在FFOAPRootViewController添加如下代码，配置demo列表数据源

``` objectivec
NSMutableArray *array = @[].mutableCopy;
{
     FFOAPCellModel *model = FFOAPCellMake(@"本地知乎Demo",@"ZhiHuDemo",@"");
     model.localPath = @"FFOAP/applications/zhihu/ZhiHuMainView";
     [array addObject:model];
 }
[tempDataSource addObject:FFOAPSectionMake(@"本地FAP小程序调试", array)];
```
其中ZhiHu为moduleName，FFOAP/applications/zhihu/ZhiHuMainView 为入口文件路径

### 调试

1. 命令行执行./startServer ，开启npm服务
2. 从XCode运行FFOAPDemo工程，启动iOS模拟器
3. 点击zhihu对应的cell，进入FAP小程序页面
4. 访问App内的开发菜单
你可以通过摇晃设备或是选择iOS模拟器的"Hardware"菜单中的"Shake Gesture"选项来打开开发菜单。
如果是在iOS模拟器中运行，还可以按下Command⌘ + Z 快捷键。如图所示：
![](http://img1.ffan.com/T1pPVTB4ZX1RCvBVdK)
![](http://img1.ffan.com/T1ZShTBbb_1RCvBVdK)
5. 刷新JavaScript
传统的原生应用开发中，每一次修改都需要重新编译，但在FAP小程序中你只需要刷新一下JavaScript代码，就能立刻看到变化。具体的操作就是在开发菜单中点击"Reload"选项。也可以在iOS模拟器中按下Command⌘ + R。
如果在iOS模拟器中按下Command⌘ + R没啥感觉，则注意检查Hardware菜单中，Keyboard选项下的"Connect Hardware Keyboard"是否被选中。

**自动刷新**

选择开发菜单中的**Enable Live Reload**可以开启自动刷新，这样可以节省你开发中的时间。
某些情况下hot reload并不能顺利实施。如果碰到任何界面刷新上的问题，请尝试手动完全刷新。
但有些时候你必须要重新编译应用才能使修改生效：
增加了新的资源
更改了任何的原生代码（objective-c/swift/java）

### 打包

1. 下载打包工具mac版本：
[mac版本](http://static.ffan.com/bo/bundlemac.app.zip)
[windows版本](http://static.ffan.com/bo/bundlewindows.exe.zip)
2. 在js源代码同级目录，添加打包配置文件config.json，内容如下
``` objectivec
{
  "index": "ZhiHuMainView.js",
  "moduleName":"ZhiHuDemo",
  "platform":"3",
  "name": "ZhiHuDemo",
  "version": "0.0.1",
  "rnFrameworkVersion":"1",
  "icon": "http://img4.imgtn.bdimg.com/it/u=712933712,3452046272&fm=21&gp=0.jpg"
}
```

字段说明如下表所示:

| 字段 | 描述 |
| --- | --- |
| index | app入口文件路径(相对路径)，如"test/index.js" |
| name | app名称，目前没有使用 |
| moduleName | 入口module Name |
| platform | 平台类型，int值，ios：1， android：2 双平台: 3 |
|  mFrameworkVersion | ffoap框架版本号 |
| version | app版本号 |
| icon | app图标，目前没有使用 |

3. 开始打包：
 打开打包工具，填写源代码目录和代码包输出目录，点击开始打包。**zhihu201703011148.fap** 即为最终产品。
![](http://img1.ffan.com/T14IVTBKds1RCvBVdK)

### 发布

1. 打开BO开放平台应用市场首页：http://open.ffan.net/apps，注册账号，并确认邮件完成身份验证，成为开发者。
![](http://img1.ffan.com/T14PVTB_As1RCvBVdK)
2. 创建应用
![](http://img1.ffan.com/T16exTBmAv1RCvBVdK)
点击左上脚**创建新应用**按钮，选择应用类型为**FAP小程序应用**，填写应用名称，应用介绍，标签，上传PNG格式400*400像素Icon，以及包文件（zhihu201703011148.fap），提交BO审核。
3. 审核
应用提交后呈现待审核状态，如下图：
![](http://img1.ffan.com/T1GILTBgCj1RCvBVdK)
待审核通过，即可供用户下载。
4. 管理我的应用
选择左侧**我的应用**按钮，可进行查看，编辑应用信息，发布新版本，下架在线应用等操作，管理我的应用。

### 验证

1. 获取应用ID
待通过审核，应用上架后，点击应用图标，打开链接如下http://open.sit.ffan.net/apps/detail/1101，应用ID即为：**app_1101**
2.  修改native代码，在FFOAPRootViewController添加如下代码，配置demo列表数据源
``` objectivec
{
   FFOAPCellModel *model = FFOAPCellMake(@"知乎Demo",@"",@"app_1101");
   [array addObject:model];
}
```
3. 模拟器或真机运行Demo，点击列表对应项，即可下载app_1101对应的app，进行线上验证。

## Hybrid部分
### H5 APP 概述
使用Webkit渲染，跨平台的web应用。基于WebViewJavascriptBridge实现与native的交互，获取部分native能力。
>iOS参考链接：https://github.com/marcuswestin/WebViewJavascriptBridge
>Android参考链接：https://github.com/gzsll/WebViewJavascriptBridge

### Hybrid iOS SDK
#### Hybrid iOS SDK简介
Hybrid SDK 核心部分包括一个控制器FFHybridViewController，一个协议FFHybridWidget，以及一组实现FFHybridWidget协议的Widget，开发者也可以按需要实现自己的Widget。

![](http://img1.ffan.com/T1mTxTBXJT1RCvBVdK)

#### Widgets

Widgets是native与h5的接口，各Widget实现独立接口

| Widgets      |   方法名 |   功能 |
| :-------- | :--------| :--------|
| FFHybridDeviceInfoWidget  | common.getDevInfo | 获取设备信息 |
| FFHybridLocationWidget    | common.getLocation | 获取地理位置信息 |
| FFHybridNavTitleWidget    | common.setTitle | 修改navgationbar title |
| FFHybridWebViewWidget     | common.openWebPage | 打开新的web页面 |
| FFHybridRNAppWidget       | common.openLocalRNPage | 打开reactnative app |
| FFHybridNavbarItemsWidget | common.setRightNavBarItem | 自定义navgationbar 右按钮 |

#### FFHybridViewController的使用

封装WKWebview和WebViewJavascriptBridge，用于接入h5应用，展示加载进度，返回和关闭按钮
为定制Widgets，FFHybridViewController 需要子类实现，这里以FFOAPWebViewController为例
``` objectivec
#import <UIKit/UIKit.h>
#import "FFHybridViewController.h"

@interface FFOAPWebViewController : FFHybridViewController

@end
```
``` objectivec
@implementation FFOAPWebViewController
- (void)viewDidLoad
{
    [super viewDidLoad];
    // 添加widgets的监听
    [self registerHandlers];
    // urlStr 是h5地址
    if (self.urlStr) {
        [self loadURL:self.urlStr];
    }
    // 显示进度条
    self.showProgress = YES;
    // 定制进度条颜色
    self.progressColor = [UIColor redColor];
}
// 配置需要监听的接口
- (NSArray *)widgets{
    return @[[FFHybridWebViewWidget new],
             [FFHybridNavTitleWidget new],
             [FFHybridDeviceInfoWidget new],
             [FFHybridRNAppWidget new],
             [FFHybridLocationWidget new],
             [FFHybridNavbarItemsWidget new],
             ];
}

@end
```

#### Widgets开发示例

修改navgationbar title

``` objectivec
@interface FFHybridNavTitleWidget ()
@property (nonatomic, copy) NSString *title;
@end

@implementation FFHybridNavTitleWidget
// 配置接口字段
- (NSString *)action
{
    return @"common.setTitle";
}
// 配置接口是否生效
- (BOOL)canPerformAction
{
    return YES;
}
// 解析js调用参数
- (void)prepareWithData:(id)data
{
    self.title = data[@"title"];
}
// 业务处理，回调js
- (void)performWithController:(FFHybridViewController *)controller  callback:(FFHybridWidgetCallback) callback
{
    if (controller) {
        // 修改navgationbar title
        controller.title = self.title;
    }
    callback(FFHybridWidgetData(@{@"title":self.title}, @200, @"OK"));
}

@end
```