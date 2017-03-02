# 一、注册

首先您需要打开 [开发者平台首页](http://open.ffan.net), 点击右上角注册按钮, 填写相关信息注册为开发者.

# 二、开发

## 1、发布新应用

1.1 点击 [应用市场](http://open.ffan.net/apps) -> 发布新应用, 按要求填写相关应用信息, 发布新应用

1.2 成功发布新应用后, 系统会生成 AppID 和 AppSecrect（待补充）

## 2、环境搭建

2.1 **Android 开发者:**

- 首先, 请下载安装 `IDE`。[请点击下载 AndroidStudio](https://developer.android.com/studio/index.html)

- 安装 `ReactNative` 运行环境。[参考官方文档](http://facebook.github.io/react-native/docs/getting-started.html)

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

- 集成 `SDK`（待补充）[点击下载 SDK](http://open.ffan.net/apps/create)

  * 打开 `android studio` 选择打开已有 `android` 工程

  ![Alt text](http://p1.bqimg.com/1949/c0537c381afed1e9.jpg)

  * 选择已下载 `SDK` 目录, 点击打开, 等待 `gradle` 编译通过

- 验证环境（待补充）

2.2 **iOS 开发者:**

- 首先, 请下载安装 `Xcode`。[请点击下载 Xcode](https://itunes.apple.com/cn/app/xcode/id497799835?mt=12)

> 注:`Xcode` 最低版本要求为7.0

- 安装 `ReactNative` 运行环境。

```bash
# 1.homebrew—— Mac系统的包管理器, 用于安装 NodeJS 和一些其他必需的工具软件。
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 2.node——使用Homebrew来安装node.js
brew install node
# 3.安装完node后可以采用设置npm镜像, 加速后面的过程
npm config set registry https://registry.npm.taobao.org –global
npm config set disturl https://npm.taobao.org/dist –global
# 4.react native cli——用于创建、初始化、更新、打包等任务
npm install -g react-native-cli
# 5.Watchman——packger可以快速捕捉文件的变化, 从而实现实时刷新
brew install watchman
# 6.Flow——facebook自家代码规范检查工具
brew install flow
```

- `Atom & Nuclide`: Facebook 提供的基于 `atom` 的集成开发环境, 可用于编写、运行和 调试 `React Native` 应用

  [请点击下载Atom](https://atom.io/)

  [请点击下载Nuclide](https://github.com/facebook/nuclide)

  其他 `IDE` 参考: `DECO`, `sublime2`, `webStorm`

- 集成 `SDK` :[点击下载 SDK](http://open.ffan.net/apps/create)

  1\. 添加 `SDK` 文件

  将 `FFOAPSDK` 目录, `node_modules` 目录, `package.json`, `startServer` 拷贝到工程同级目录

  ![Alt text](http://timg.ffan.com/convert/resize/url_T1YcLTB4__1RCvBVdK/tfs/14834337846233.jpeg)

  2\. 添加 `libReactConfig`

  将包含 `libReactConfig.a`, 一系列头文件和 `Fonts` 目录的文件夹 `FFOAPSDK` 拖拽到工程中

  ![Alt text](http://timg.ffan.com/convert/resize/url_T1l6bTBvV_1RCvBVdK/tfs/addsdk.jpeg)

  3\. 设置 `flag`

  找到对应 `target` 的 `Build Settings`, `Linking－>Other Linker Flags` 添加 `flag`, `-Objc` 和 `-all_load`

  ![Alt text](http://timg.ffan.com/convert/resize/url_T1u2ETBj_T1RCvBVdK/tfs/projectflag.jpeg)

  4\. 添加 `ReactNative` 库

  添加 `React` 组件工程文件:

  将 `node_modules/react-native/React/React.xcodeproj` 拖到工程中

  ![Alt text](http://timg.ffan.com/convert/resize/url_T13OJTBTbT1RCvBVdK/tfs/14834343700116.jpeg)

  5\. 配置库依赖

  点击你的主工程文件, 选择 `Build Phases`, 然后把刚才所添加进去的 `.xcodeproj` 下的 `Products` 文件夹中的静态库文件（.a文件）, 拖到 `Link Binary With Libraries` 组内。

  ![Alt text](http://timg.ffan.com/convert/resize/url_T1D6LTB5__1RCvBVdK/tfs/14834348297098.jpeg)

  6\. 添加其它组件依赖

  其它本地组件都在 `node_modules/react-native/Libraries` 目录。使用同样的方法添加 `RCTImage` 或其他组件

  ![Alt text](http://timg.ffan.com/convert/resize/url_T1f7hTB4JT1RCvBVdK/tfs/14834501543939.jpeg)

  7\. 添加系统依赖库

  点击你的主工程文件, 选择 `General`, 在 `Linked Frameworks and Libraries` 添加 `libstdc++.tbd` 和 `libicucore.tbd`

  ![Alt text](http://timg.ffan.com/convert/resize/url_T1t0JTBTdT1RCvBVdK/tfs/14834496841174.jpeg)

- 验证环境, 请输入如下命令行:

```bash
react-native init AwesomeProject
cd AwesomeProject
react-native run-ios
```
现在你已经成功运行了项目, 我们可以开始尝试动手改一改了:

> 1\. 使用你喜欢的编辑器打开 `index.ios.js` 并随便改上几行。
> 2\. 在 `iOS` 模拟器中按下 `⌘-R` 就可以刷新 `App` 并看到你的最新修改！

2.3 **FE开发者:**

- 首先, 请下载安装 `IDE`。[JS 开发者请点击下载 WebStorm](http://www.jetbrains.com/webstorm/)

- 安装 `ReactNative` 运行环境（待补充）

- 集成代码审查规则文件（待补充）[点击下载代码审查规则文件](http://www.jetbrains.com/webstorm/)

- 验证环境（待补充）

## 3、开发应用

**iOS 开发者:**

### 3.1 创建 `App`

- 首先打开 `FFOAPDemo` 工程, 进入到 `FFOAP` 文件夹下面, 可以看到 `FFOAP` 下面, 有两个目标文件夹, `applications` 和 `widgets`, 如下图所示

  ![Alt text](http://p1.bqimg.com/1949/072f9ae612034516.png)

- 如果想开发普通 `App`, 则进入到 `applications` 目录下, 参照 `ReactNative` 语法规范开发 `JS` 文件。

- 如果想开发组件, 则进入到 `widgets` 目录下, 参照 `ReactNative` 语法规范开发 `JS` 文件。

- 如上步骤所述, 创建完成相关 `JS` 文件, 之后即可创建配置文件。

### 3.2 创建配置文件

- `App Config` 文件放在 `app` 的根目录下, 文件名为 `config.json`, 文件内容是一个 `json` 串。格式如下:

```javascript
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

- 字段说明如下表所示

| 字段      |     描述 |
| :-------- | :--------|
| index    |   app入口文件路径(相对路径), 如"test/index.js" |
| name   |   app名称, 目前没有使用 |
| moduleName    |   入口module Name |
| platform    |   平台类型, int值, ios:1,  android:2 |
| rnFrameworkVersion    |   ffoap框架版本号 |
| version    |   app版本号 |
| icon    |   app图标, 目前没有使用 |

### 3.3 创建配置文件

- 打开 `FFOAPDemo` 中 `AppDelegate` 文件, 在 `applicationDidBecomeActive` 调用 `FFReactNativeTempleteManager` 中的 `requestConfigWithAppId:channelId:pageIds:platform` 方法拉取各页面远端配置打开方式。

```java
- (void)applicationDidBecomeActive:(UIApplication *)application {
[[FFReactNativeTempletManager sharedInstance] requestConfigWithAppId:@"1"
                                                       channelId:@"appstore"
                                                         pageIds:nil
                                                        platform:FFReactNativePlatform_iOS];
}
```
- 进入到 `FFOAPRootViewController`,修改 `dataSource` 的 `get` 方法, 向里面填充 `FFOAPCellModel`, 其内容说明如下

| 字段      |     描述 |
| :-------- | :--------|
| displayName    |   在当前页面展示的名字 |
| moduleName   |   打开指定App入口文件的模块名 |
| appid    |   注册应用时候返回的appid, 如果为模板型app, 则为模板id |
| isLocal    |   是否是本地调试 |
| localPath    |   本地调试时候文件的相对路径 |

- 如果为本地调试, 则初始化 `FFReactNativeController`, 打开本地服务调试即可

```java
NSString *moduleName = model.moduleName;
NSString *path = model.localPath;
FFReactNativeController *vc = [FFReactNativeController new];
[vc setParamsWithIsRNLocalDebug:@"1"
             jsCodeLocation:path
                 moduleName:moduleName
                    appType:1
               jsProperties:nil];
[vc setNativeNavigationBarHidden:YES];
[self.navigationController pushViewController:vc animated:YES];
```

- 如果为远端调试, 则需要先调用 `FFReactNativeTempletManager` 中的获取配置信息的方法 `getPageConfig:params:`,之后根据配置信息, 如果类型为 `ReactNative`, 检查本地是否有差分包, 如果存在, 则加载同时后台检查是否更新, 如果不存在, 则先进入错误页面, 同时后台检查更新。具体如下

```java
NSString *appid = model.appid;
NSString *moduleName = model.moduleName;
NSDictionary *config = [[FFReactNativeTempletManager sharedInstance] getPageConfig:appid
                                                                          params:nil];
  if ([config[@"type"] isEqualToString:@"RN"]) {
      moduleName = config[@"moduleName"];
      FFReactNativeAppInfo *appInfo = [[FFReactNativeHelper sharedInstance] appInfoFromArchivePathWithModuleName:moduleName];
      if (appInfo.downloadUrl) { // 没有更新, 取本地
          FFReactNativeController *vc = [FFReactNativeController new];
          [vc setParamsWithIsRNLocalDebug:@"0"
                            jsCodeLocation:appInfo.downloadUrl
                                moduleName:moduleName
                                  appType:1
                              jsProperties:nil];
          [vc setNativeNavigationBarHidden:YES];
          [self.navigationController pushViewController:vc animated:YES];
          dispatch_async(dispatch_get_global_queue(0, 0), ^{
              [[FFReactNativeCheckUpdateManager sharedInstance] checkJSBundleUpdateWithAppType:1
                                                                                    sdkVersion:@"4"
                                                                                    appVersion:@"4.9.3"
                                                                                          apps:@[appInfo]
                                                                                completionBlock:nil];
          });
      } else { // 网络加载
          FFOAPErrorViewController *errorVC = [FFOAPErrorViewController new];
          [self.navigationController pushViewController:errorVC animated:YES];
          dispatch_async(dispatch_get_global_queue(0, 0), ^{
              FFReactNativeAppInfo *appInfo = [FFReactNativeAppInfo new];
              appInfo.appId = @"pageapp_2_1_10025585_3";
              appInfo.version = @"0";
              appInfo.moduleName = moduleName;
              [[FFReactNativeCheckUpdateManager sharedInstance] checkJSBundleUpdateWithAppType:1
                                                                                    sdkVersion:@"4"
                                                                                    appVersion:@"4.9.3"
                                                                                          apps:@[appInfo]
                                                                                completionBlock:nil];
          });
      }
```

- 如果类型为 `Native`, 则跳转到指定 `Native` 界面

```java
FFOAPNativeViewController *native = [[FFOAPNativeViewController alloc] init];
[self.navigationController pushViewController:native animated:YES];
```

- 如果类型为 `hybrid`, 则跳转到指定 `H5` 界面

```java
FFOAPWebViewController *webVC = [[FFOAPWebViewController alloc] init];
webVC.urlStr = config[@"url"];
[self.navigationController pushViewController:webVC animated:YES];
```

### 3.4 API 文档

- 网络状态

```java
// 开始网络状态监听
RCT_EXPORT_METHOD(startNotifier)
// 停止网络状态监听
RCT_EXPORT_METHOD(stopNotifier)
// 当前状态
RCT_EXPORT_METHOD(currentReachabilityStatus:(RCTResponseSenderBlock)callback)
typedef enum : NSInteger {
WDNotReachable = 0,
WDReachableViaWiFi,
} WDNetworkStatus;
// 状态变化通知
RCT_EXPORT_METHOD(onNotifyStatus:(RCTResponseSenderBlock)callback)
```

- 电话短信

```java
// 打电话
RCT_EXPORT_METHOD(call:(NSString *)tel)
// 发短信
RCT_EXPORT_METHOD(sms:(NSString *)mobile)
// 调起短信UI
RCT_EXPORT_METHOD(openSmsUI:(NSArray *)mobiles subject:(NSString *)subject body:(NSString *)body)
```

- 相机相册

```java
// 打开摄像头, 拍摄一张图片
RCT_EXPORT_METHOD(openCamera:(RCTResponseSenderBlock)callback)
// 打开相册, 选取多张图片
RCT_EXPORT_METHOD(openAlbum:(int)count callback:(RCTResponseSenderBlock)callback)
```

- 设备信息

```java
// 按列表过滤, 获取信息
RCT_EXPORT_METHOD(deviceInfo:(NSArray *)filter callback:(RCTResponseSenderBlock)callback)
// 全部设备信息
RCT_EXPORT_METHOD(deviceInfoAll:(RCTResponseSenderBlock)callback)
```

- 存取 `NSUserDefault` 数据

```java
// 存json对象
RCT_EXPORT_METHOD(setObject:(id)obj forKey:(NSString *)key)
// 读json对象
RCT_EXPORT_METHOD(objectForKey:(NSString *)key callback:(RCTResponseSenderBlock)callback)
```

## 4、JSSDK使用文档

**概述:**

- `JS-SDK` 是飞凡网内部向网页开发者提供的网页开发工具包

- 通过使用 `JS-SDK`, 网页开发者可借助 `js-bridge` 调用手机等设备的功能

- 此文档面向网页开发者介绍 `JS-SDK` 如何使用及相关注意事项

**JSSDK使用步骤:**

### 步骤一: 引入JS文件

在需要调用JS接口的页面引入JS文件，（支持https）：
> http://nres.ffan.com/newactivity/ffan-bo-jssdk-0.0.1.min.js

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
**openLocalRNPage**

- 功能描述: 通过H5打开一个新的 `WebView` 去打开一个本地 `React Native` 页面

- 方法名称: sdk.openLocalRNPage

- 参数定义: 参数为一个 `JSON` 对象

  * **moduleName** 要打开的 `RN` 模块名称

  * **path** `FFOAP` 内 `RN` 入口文件的相对路径

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
      data:{
          name:'iOS_Wifi', //设备名称
          model:'营销', //设备类型
          systemVersion:'1.0.0', //系统版本
      }
      status:200,
      msg:'success',
    }
  }).catch(function(err) {
    // fail
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
      data:{
         lot:'116.46', //经度
         lat:'39.92', //维度
      }
      status:200,
      message:'OK',
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

## 5、H5授权接口说明

### 5.1、 **`accessToken` 说明**

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

### 5.2、 **`accessToken` 的签名说明**

**签名算法**

- 参与签名的字段: `accessToken`（资源调用凭证）、`appKey`（第三方应用的 appKey）、`nonceStr`（随机字符串）、`ts`（当前时间戳）、`url`（调用 JS 接口页面的完整 URL, 不包含 # 及其后面部分）

- 对所有待签名参数按照字段名的 `ASCII` 码从小到大排序（字典序）后, 使用URL键值对的格式（即 key1=value1&key2=value2…）拼接成字符串 `str1`

- 这里需要注意的是所有参数名均为小写字符。对 `str1` 作 `SHA256` 加密, 字段名和字段值都采用原始值, 不进行 `URL` 转义。

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

# 三、调试

## 1、Android开发者

进入工程目录中的 `js_module` 目录, 运行 `npm start` 或者 `react-native start`, 开启服务, 初始化 `IReactConfig` 时候在下列方法中返回 `true`, 并在 `LocalDebugParams` 中传入调试的 `moduleName`。

```java
@Override
public boolean isLocalDebug() {
  return true;
}

@Override
public ArrayMap<String, String> getLocalDebugParams() {
	ArrayMap<String, String> params = new ArrayMap();
	params.put(Constants.VIEW_CONFIG_RN_MODULE_NAME, "test");
	return params;
}
```

## 2、iOS开发者

### 访问 App 内的开发菜单

你可以通过摇晃设备或是选择 `iOS` 模拟器的 "Hardware" 菜单中的 "Shake Gesture" 选项来打开开发菜单。如果是在 `iOS` 模拟器中运行, 还可以按下 `Command⌘ + Z` 快捷键。如图所示:

![Alt text](http://p1.bqimg.com/1949/5c217c931a014723.png)

![Alt text](http://p1.bqimg.com/1949/4aae427b5dbcc18c.png)

### 刷新 Javascript

- 传统的原生应用开发中, 每一次修改都需要重新编译, 但在 `RN` 中你只需要刷新一下 `JavaScript` 代码, 就能立刻看到变化。具体的操作就是在开发菜单中点击 "Reload" 选项。也可以在 `iOS` 模拟器中按下 `Command⌘ + R`。

- 如果在 `iOS` 模拟器中按下 `Command⌘ + R` 没啥感觉, 则注意检查 `Hardware` 菜单中, `Keyboard` 选项下的 "Connect Hardware Keyboard" 是否被选中。

- 选择开发菜单中的 Enable Live Reload 可以开启自动刷新, 这样可以节省你开发中的时间。

- 某些情况下 hot reload 并不能顺利实施。如果碰到任何界面刷新上的问题, 请尝试手动完全刷新。

- 但有些时候你必须要重新编译应用才能使修改生效:

  1\. 增加了新的资源

  2\. 更改了任何的原生代码（objective-c/swift/java）

### FFOAP 本地开发调试

- 参照上述开发步骤, 调整代码参数为本地调试模式

- 进入 `FFOAP` 目录, 启动 `startServer` 脚本, 本地启动服务

# 四、打包

4.1、[请下载打包工具](http://open.ffan.net/apps/list)

4.2、参考打包工具中的应用规范对包进行调整（待补充）

4.3、参考打包工具中的使用文档进行打包（待补充）


# 五、发布

5.1、[登录开发者平台首页](http://open.ffan.net), 点击 应用市场->我的应用->发布新版本, 并上传应用文件, 如:应用名.fap

5.2、填写版本号, 版本号采用标准三段式, 如: 1.0.0

5.3、填写版本简介, 字数请限制在 120 字内

5.4、提交审核（审核规则待补充）

# 六、审核

6.1、应用审核通过后, 可以在 我的应用->已审核 中查看
6.2、点击发布, 会上架到应用商店
