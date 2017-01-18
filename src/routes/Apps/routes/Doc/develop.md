# 一、注册

1、首先您需要打开 [开发者平台首页](http://open.ffan.net)，点击右上角注册按钮，填写相关信息注册为开发者。

# 二、开发

## 1、创建应用

1\.点击 [应用市场](http://open.ffan.net/apps) -> 创建新应用，按要求填写相关应用信息，创建应用
2\.成功创建应用后，系统会生成AppID和AppSecrect（待补充）

## 2、环境搭建
1\.Android开发者：
* 首先，请下载安装IDE。[请点击下载AndroidStudio](https://developer.android.com/studio/index.html)
* 安装ReactNative运行环境。[参考官方文档](http://facebook.github.io/react-native/docs/getting-started.html)
```bash
# 1.安装brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 2.安装node
brew install node
# 3.安装watchman
brew install watchman
# 4.安装react-native
npm install -g react-native-cli
```

- 集成SDK（待补充）[点击下载SDK](http://open.ffan.net/apps/create)
1\.打开android studio选择打开已有android工程 
![Alt text](http://p1.bqimg.com/1949/c0537c381afed1e9.jpg)
2\.选择已下载SDK目录，点击打开，等待gradle编译通过 

- 验证环境（待补充）

2\.iOS开发者:
- 首先，请下载安装IDE。[请点击下载Xcode](https://itunes.apple.com/cn/app/xcode/id497799835?mt=12)
> 注：Xcode最低版本要求为7.0

- 安装ReactNative运行环境。
```bash
# 1.homebrew—— Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
# 2.node——使用Homebrew来安装node.js
brew install node
# 3.安装完node后可以采用设置npm镜像，加速后面的过程
npm config set registry https://registry.npm.taobao.org –global
npm config set disturl https://npm.taobao.org/dist –global
# 4.react native cli——用于创建、初始化、更新、打包等任务
npm install -g react-native-cli
# 5.Watchman——packger可以快速捕捉文件的变化，从而实现实时刷新
brew install watchman
# 6.Flow——facebook自家代码规范检查工具
brew install flow
```

- Atom&Nuclide:Facebook提供的基于atom的集成开发环境，可用于编写、运行和 调试React Native应用 
1\.[请点击下载Atom](https://atom.io/)
2\.[请点击下载Nuclide](https://github.com/facebook/nuclide)
3\.其他IDE参考： DECO，sublime2，webStorm
- 集成SDK：[点击下载SDK](http://open.ffan.net/apps/create)
### 1\.添加SDK文件
将FFOAPSDK目录，node_modules目录，package.json，startServer拷贝到工程同级目录
![Alt text](http://timg.ffan.com/convert/resize/url_T1YcLTB4__1RCvBVdK/tfs/14834337846233.jpeg)
### 2\.添加libReactConfig
将包含libReactConfig.a，一系列头文件和Fonts目录的文件夹FFOAPSDK拖拽到工程中 
![Alt text](http://timg.ffan.com/convert/resize/url_T1l6bTBvV_1RCvBVdK/tfs/addsdk.jpeg)
### 3\.设置flag
找到对应target的Build Settings，Linking－>Other Linker Flags 添加flag，`-Objc`和`-all_load`
![Alt text](http://timg.ffan.com/convert/resize/url_T1u2ETBj_T1RCvBVdK/tfs/projectflag.jpeg)
### 4\.添加ReactNative库
添加React组件工程文件:
将node_modules/react-native/React/React.xcodeproj拖到工程中
![Alt text](http://timg.ffan.com/convert/resize/url_T13OJTBTbT1RCvBVdK/tfs/14834343700116.jpeg)
### 5\.配置库依赖
点击你的主工程文件，选择Build Phases，然后把刚才所添加进去的.xcodeproj下的Products文件夹中的静态库文件（.a文件），拖到Link Binary With Libraries组内。
![Alt text](http://timg.ffan.com/convert/resize/url_T1D6LTB5__1RCvBVdK/tfs/14834348297098.jpeg)
### 6\.添加其它组件依赖
其它本地组件都在node_modules/react-native/Libraries目录。使用同样的方法添加RCTImage或其他组件
![Alt text](http://timg.ffan.com/convert/resize/url_T1f7hTB4JT1RCvBVdK/tfs/14834501543939.jpeg)
### 7\.添加系统依赖库
点击你的主工程文件，选择General，在Linked Frameworks and Libraries 添加`libstdc++.tbd`和`libicucore.tbd`
![Alt text](http://timg.ffan.com/convert/resize/url_T1t0JTBTdT1RCvBVdK/tfs/14834496841174.jpeg)

- 验证环境，请输入如下命令行：
```
    react-native init AwesomeProject
    cd AwesomeProject
    react-native run-ios
```
现在你已经成功运行了项目，我们可以开始尝试动手改一改了：
> 1\.使用你喜欢的编辑器打开index.ios.js并随便改上几行。
> 2\.在iOS 模拟器中按下⌘-R就可以刷新App并看到你的最新修改！

3\.FE开发者:
- 首先，请下载安装IDE。[JS开发者请点击下载WebStorm](http://www.jetbrains.com/webstorm/)

- 安装ReactNative运行环境（待补充）

- 集成代码审查规则文件（待补充）[点击下载代码审查规则文件](http://www.jetbrains.com/webstorm/)

- 验证环境（待补充）

## 3、开发应用
1\.iOS开发者：

### 1\.创建App
- 首先打开FFOAPDemo工程，进入到FFOAP文件夹下面，可以看到FFOAP下面，有两个目标文件夹，applications和widgets，如下图所示 
![Alt text](http://p1.bqimg.com/1949/072f9ae612034516.png)

- 如果想开发普通App，则进入到applications目录下，参照ReactNative语法规范开发JS文件。

- 如果想开发组件，则进入到widgets目录下，参照ReactNative语法规范开发JS文件。 

- 如上步骤所述，创建完成相关JS文件，之后即可创建配置文件。

### 2\.创建配置文件

- App Config文件放在app的根目录下，文件名为config.json，文件内容是一个json串。格式如下：

```
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
| index    |   app入口文件路径(相对路径)，如"test/index.js" |  
| name   |   app名称，目前没有使用 |  
| moduleName    |   入口module Name |  
| platform    |   平台类型，int值，ios：1， android：2 |  
| rnFrameworkVersion    |   ffoap框架版本号 |  
| version    |   app版本号 |  
| icon    |   app图标，目前没有使用 |  

### 3\.创建配置文件

- 打开FFOAPDemo中AppDelegate文件，在applicationDidBecomeActive调用FFReactNativeTempleteManager中的requestConfigWithAppId:channelId:pageIds:platform方法拉取各页面远端配置打开方式。

```
- (void)applicationDidBecomeActive:(UIApplication *)application {
[[FFReactNativeTempletManager sharedInstance] requestConfigWithAppId:@"1"
                                                       channelId:@"appstore"
                                                         pageIds:nil
                                                        platform:FFReactNativePlatform_iOS];
}
```
- 进入到FFOAPRootViewController,修改dataSource的get方法，向里面填充FFOAPCellModel，其内容说明如下

| 字段      |     描述 |  
| :-------- | :--------| 
| displayName    |   在当前页面展示的名字 |  
| moduleName   |   打开指定App入口文件的模块名 |  
| appid    |   注册应用时候返回的appid，如果为模板型app，则为模板id |  
| isLocal    |   是否是本地调试 |  
| localPath    |   本地调试时候文件的相对路径 |  



- 如果为本地调试，则初始化FFReactNativeController，打开本地服务调试即可

```
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
- 如果为远端调试，则需要先调用FFReactNativeTempletManager中的获取配置信息的方法getPageConfig:params:,之后根据配置信息，如果类型为ReactNative，检查本地是否有差分包，如果存在，则加载同时后台检查是否更新，如果不存在，则先进入错误页面，同时后台检查更新。具体如下

```
NSString *appid = model.appid;
	NSString *moduleName = model.moduleName;
	NSDictionary *config = [[FFReactNativeTempletManager sharedInstance] getPageConfig:appid
                                                                            params:nil];
    if ([config[@"type"] isEqualToString:@"RN"]) {
        moduleName = config[@"moduleName"];
        FFReactNativeAppInfo *appInfo = [[FFReactNativeHelper sharedInstance] appInfoFromArchivePathWithModuleName:moduleName];
        if (appInfo.downloadUrl) { // 没有更新，取本地
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

- 如果类型为Native，则跳转到指定Native界面

```
FFOAPNativeViewController *native = [[FFOAPNativeViewController alloc] init];
[self.navigationController pushViewController:native animated:YES];
```

- 如果类型为hybrid，则跳转到指定H5界面

```
FFOAPWebViewController *webVC = [[FFOAPWebViewController alloc] init];
webVC.urlStr = config[@"url"];
[self.navigationController pushViewController:webVC animated:YES];
```

### 4\.API文档

- 网络状态

```
//开始网络状态监听
RCT_EXPORT_METHOD(startNotifier)
//停止网络状态监听
RCT_EXPORT_METHOD(stopNotifier)
//当前状态
RCT_EXPORT_METHOD(currentReachabilityStatus:(RCTResponseSenderBlock)callback)
typedef enum : NSInteger {
WDNotReachable = 0,
WDReachableViaWiFi,
} WDNetworkStatus;
//状态变化通知
RCT_EXPORT_METHOD(onNotifyStatus:(RCTResponseSenderBlock)callback)
```
- 电话短信

```
//打电话
RCT_EXPORT_METHOD(call:(NSString *)tel)
//发短信
RCT_EXPORT_METHOD(sms:(NSString *)mobile)
//调起短信UI
RCT_EXPORT_METHOD(openSmsUI:(NSArray *)mobiles subject:(NSString *)subject body:(NSString *)body)
```

- 相机相册

```
//打开摄像头，拍摄一张图片
RCT_EXPORT_METHOD(openCamera:(RCTResponseSenderBlock)callback)
//打开相册，选取多张图片
RCT_EXPORT_METHOD(openAlbum:(int)count callback:(RCTResponseSenderBlock)callback)
```

- 设备信息

```
//按列表过滤，获取信息
RCT_EXPORT_METHOD(deviceInfo:(NSArray *)filter callback:(RCTResponseSenderBlock)callback)
//全部设备信息
RCT_EXPORT_METHOD(deviceInfoAll:(RCTResponseSenderBlock)callback)
```

- 存取NSUserDefault数据

```
//存json对象
RCT_EXPORT_METHOD(setObject:(id)obj forKey:(NSString *)key)
//读json对象
RCT_EXPORT_METHOD(objectForKey:(NSString *)key callback:(RCTResponseSenderBlock)callback)
```

# 三、调试

## 1、Android开发者

进入工程目录中的js_module目录，运行npm start或者react-native start，开启服务，初始化IReactConfig时候在下列方法中返回true, 并在LocalDebugParams中传入调试的moduleName。

```
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

### 1\.访问App内的开发菜单

你可以通过摇晃设备或是选择iOS模拟器的"Hardware"菜单中的"Shake Gesture"选项来打开开发菜单。如果是在iOS模拟器中运行，还可以按下Command⌘ + Z 快捷键。如图所示：

![Alt text](http://p1.bqimg.com/1949/5c217c931a014723.png)

![Alt text](http://p1.bqimg.com/1949/4aae427b5dbcc18c.png)

### 2\.刷新Javascript

- 传统的原生应用开发中，每一次修改都需要重新编译，但在RN中你只需要刷新一下JavaScript代码，就能立刻看到变化。具体的操作就是在开发菜单中点击"Reload"选项。也可以在iOS模拟器中按下Command⌘ + R。

- 如果在iOS模拟器中按下Command⌘ + R没啥感觉，则注意检查Hardware菜单中，Keyboard选项下的"Connect Hardware Keyboard"是否被选中。

- 选择开发菜单中的Enable Live Reload可以开启自动刷新，这样可以节省你开发中的时间。

- 某些情况下hot reload并不能顺利实施。如果碰到任何界面刷新上的问题，请尝试手动完全刷新。

- 但有些时候你必须要重新编译应用才能使修改生效：
1\.增加了新的资源
2\.更改了任何的原生代码（objective-c/swift/java）

### 3\.FFOAP本地开发调试

- 参照上述开发步骤，调整代码参数为本地调试模式

- 进入FFOAP目录，启动startServer脚本，本地启动服务


# 四、打包
1、[请下载打包工具](http://open.ffan.net/apps/list)
2、参考打包工具中的应用规范对包进行调整（待补充）
3、参考打包工具中的使用文档进行打包（待补充）

# 五、发布
1、[登录开发者平台首页](http://open.ffan.net)，点击 应用市场->我的应用->发布新版本，并上传应用文件，如：应用名.fap
2、填写版本号，版本号采用标准三段式，如：1.0.0
3、填写版本简介，字数请限制在120字内
4、提交审核（审核规则待补充）

# 六、审核
1、应用审核通过后，可以在 我的应用->已审核 中查看
2、点击发布，会上架到应用商店
