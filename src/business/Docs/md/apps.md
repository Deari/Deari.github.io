# 开始前必读

## 首页

### 蓝海开放平台概述

蓝海开放平台是开发者通过应用、组件、硬件为蓝海商家和蓝海顾客，提供服务的平台，而蓝海开放平台API市场中的接口则是提供服务的基础，开发者在蓝海开放平台中获取API接口权限后，可以通过阅读本接口文档来帮助开发出蓝海商家需要的应用、组件、硬件。


### 服务人群

开发者主要服务于两类人群，一类是蓝海商家，一类是蓝海顾客。

什么是蓝海商家？
蓝海开放平台为商家提供的蓝海商家客户端，商家通过使用蓝海开放平台【应用市场】中的应用，管理自己的会员、营销、交易、商品、对账等数据；通过使用【组件市场】中的组件，为自己的网上店铺进行装修，组件是店铺中的一个一个的展示单位，配置组件信息，保存并发布后，蓝海顾客可以看到相应的信息；通过使用【硬件市场】中的硬件，完成自己的线下业务，如收银POS机、打印机、WiFi探针等。市场中的应用、组件、硬件，均由开发者提供。
![Alt text](http://timg.ffan.com/convert/resize/url_T1BQATB4dT1RCvBVdK/tfs/0bfff836a6088c7f7db341cabf0f369d.png)
![Alt text](http://timg.ffan.com/convert/resize/url_T1IudTB4CX1RCvBVdK/tfs/3318870ce9818294629d56d21a56da40.png)




什么是蓝海顾客？
蓝海开放平台为顾客提供的客户端，或者其他客户端嵌入蓝海开放平台的SDK，顾客可以使用蓝海商家在【店铺装修】中配置的组件。如领取会员卡、进行抽奖。
为了识别蓝海商家，针对每个商家，会产生一个安全的wid。开发者在使用API的官方接口时，都需要传递wid。

蓝海商家的客户端包括哪些？
目前，只支持商家在商家Pad端进行使用。之后会支持手机、PC等。商家Pad以横屏的方式进行展示。Pad端的默认分辨率为1920*1200。

商家Pad端中有哪些应用？
Pad端的默认应用包括：会员管理、营销工具、商品管理、订单管理、设备管理、收款、核销、门店装修、应用市场等。
商家还可以在应用市场中，下载适合自己门店的应用、组件。

谁可以在应用市场中提供应用？
开发者在蓝海开放平台注册成功，即可在应用市场中发布自己的应用、组件，为商家提供服务。


 - 开发者注意

>1、蓝海开放平台开发是指为蓝海商家进行业务开发，为移动应用、PC端网站、硬件的开发。

>2、在进行开发时，你可以先通过测试号申请系统，快速申请一个接口测试号，立即开始接口测试开发。



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

### 创建新应用

- 点击页面左侧的[创建新应用][2]

- 选择创建新应用的类型。应用类型包括FAP小程序、HTML5、APK。

### 开发、打包、调试

#### Android开发者

- 开发FAP小程序类型的应用

- 开发APK类型的应用 

#### iOS开发者

- 开发FAP小程序类型的应用

#### H5开发者

- 开发HTML5类型的应用

### 审核

 1. 登录开发者平台首页,点击应用市场->我的应用->发布新版本,并上传应用文件（如:应用名.fap）或HTML5链接。
 2. 填写版本号, 版本号采用标准三段式, 如: 1.0.0。
 3. 填写版本简介, 字数请限制在 120 字内。
 4. 提交审核（审核规则待补充）。

### 发布

1. 应用审核通过后, 可以在 我的应用->已审核 中查看。
2. 点击发布, 会上架到应用市场。

[1]: http://apistore.intra.ffan.net/#/register
[2]: http://open.ffan.net/apps/create










# Android开发者
## FAP小程序类型

### 集成
1. 下载安装[Android Studio](https://developer.android.com/studio/index.html)
2. 下载安装[JDK](http://www.oracle.com/technetwork/java/javase/archive-139210.html)
3. 安装Android SDK：
打开Android Studio打开设置，如下图所示:
![Alt text](http://img1.ffan.com/T1JwJTBvE_1RCvBVdK)
在设置选项中选择System Setting中的Android SDK选择下载安装
![Alt text](http://img1.ffan.com/T1rPVTB5dX1RCvBVdK)
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

### 开发简易说明

#### 一、开发目录

1. 目录结构图：
![Alt text](http://img1.ffan.com/T18ThTBThv1RCvBVdK)
2. 配置文件说明：

App Config 文件放在 app 的根目录下, 文件名为 config.json, 文件内容是一个 json 串。格式如下:

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

字段说明如下表所示：

| 字段      |描述 |   
| :-------- | --------:| 
| index    |   app入口文件路径(相对路径), 如"test/index.js" |  
| name    |   app名称 |   
| platform    |平台类型（int值） ios:1, Android:2，ios&Android:3 |  
| rnFrameworkVersion     |   ffoap框架版本号 |  
| version    |   app版本号 |  

#### 二、配置

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
  //Android应用id
    public String getAppId() {
        return "1";
    }
  //Android应用版本
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
#### 三、调试
1.  修改Demo 工程的MyConfig类修改调试ffoap app类型
2.  如果是FAP小程序类型，进入工程目录中的 js_module 目录, 运行 npm start 或者 react-native start, 开启服务，即可进行正常调试。
3.  在手机FAP小程序界面中摇一摇或者按手机硬件menu键，启动FAP小程序调试界面。如下图：
![Alt text](http://img1.ffan.com/T1wShTBvAv1RCvBVdK)
4.  进入开发选项，选择端口设置，查看电脑ip地址，设置为ip地址加8081端口。如下图：
![Alt text](http://img1.ffan.com/T1jPLTB7LQ1RCvBVdK)![Alt text](http://img1.ffan.com/T14exTBXZT1RCvBVdK)
5.  电脑端安装chrome浏览器，在手机FAP小程序界面中摇一摇或者按手机硬件menu键，启动FAP小程序调试界面，选择start remote JS debuging，如图：
![Alt text](http://img1.ffan.com/T1wShTBvAv1RCvBVdK)
电脑端chrome会自动开启debug页面，选择开发者工具查看log信息等。开发者可以在手机FAP小程序开发者选项中开启enable live reload，这样一旦更改了JS端的代码就不用选择reload就可以实时看到界面的变化。


## APK类型

### 获取启动参数

**APK类型应用启动时，可以通过BO开放平台的方法获取必要的启动参数，启动参数要在APK启动Activity中获取(AndroidManifest中声明为android.intent.category.LAUNCHER的Activity)**


	示例：
	Intent intent = getIntent();
	//获取启动参数(参数为json格式的字符串)
	String launchParams = intent.getStringExtra("LaunchParams");
    //解析获取参数
    String wid = null;     //店铺唯一标识
    String storeName = null;    //店铺名称
    String storeAddress = null; //店铺地址
    String storeLogo = null;    //店铺logo,以http链接形式提供
    String org = null;      //标识来源，固定值"wanda"
    String token = null;    //登录身份令牌
    try {
        JSONObject jsonObject = new JSONObject(launchParams);
        wid = jsonObject.optString("wid");
        storeName = jsonObject.optString("storeName");
        storeAddress = jsonObject.optString("storeAddress");
        storeLogo = jsonObject.optString("storeLogo");
        org = jsonObject.optString("org");
        token = jsonObject.optString("token");
    } catch (JSONException e) {
        e.printStackTrace();
    }


## 飞凡云POS接入

### 一、简介

为了便于外部商户开发者更方便的接入飞凡云POS支付系统，我们提供了PosHelper类来帮助实现相关业务，里面已经封装好相关调用方法及回传参数，开发者只需要将其代码类复制到自己的工程中即可。调用方式写法可参看demo中例子。商户开发者也可以自行组装相关数据调用相应方法。具体可参数PosHelper类来实现相关业务功能。

### 二、接口

#### 1、支付

飞凡云POS是涵盖聚合支付功能，对外提供聚合支付功能，包括：现金、银行卡、飞凡通、快钱、微信等支付方式。

**PosHelper.pay** 聚合支付：
```java
public static boolean pay(Activity activity, String orderNo, String account, 
            long amount, int payType, List<Product> products, int requestCode)
```

- 参数说明

  * `activity`: Activity

  * `orderNo`: 使用方自己的订单号

  * `account`: 使用方自己的账号

  * `amount`: 支付金额，以分为单位，如100.01元传递10001

  * `products`: 使用方自己的商品信息
   
  * `requestCode`: 对应 Activity的startActivityForResult(Intent, int) 中的requestCode参数

聚合支付示例：

```java
List<PosHelper.Product> products = new ArrayList<PosHelper.Product>();
products.add(new PosHelper.Product("abc000001", "护肤水", 2, 3000));
products.add(new PosHelper.Product("abc000002", "洗面奶", 1, 4000));

PosHelper.pay(PayActivity.this, "10000123", "linqingxuan001", amount, FFResult
            .PAY_TYPE_CASH, products, 100);
```

支付结果：

```java
public static FFResult.PayResult getPayResult(Intent data)
```

**FFResult.PayResult** 聚合支付结果：

```java
/**
 * 支付结果 0成功{@link #RESULT_SUCCESS} 1失败{@link #RESULT_FAILURE} 2关闭{@link #RESULT_CLOSE}
 */
public final int mResult;
/**
 * 使用方自己支付时订单号
 */
public final String mOrderNo;
/**
 * POS账号
 */
public final String mPosAccount;
/**
 * POS支付单号
 */
public final String mPayOrderNo;
/**
 * POS支付类型 参考对应支付类型数据
 */
public final int mPayType;
/**
 * POS支付金额 以分为单位，如100.01元，则应返回10001
 */
public final long mAmount;
```

聚合支付结果示例：

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  if (resultCode == Activity.RESULT_OK) {
    FFResult.PayResult payResult = PosHelper.getPayResult(data);
  } else if (resultCode == Activity.RESULT_CANCELED) {
  }
}
```

#### 2、退款

退款是基于飞凡POS支付的订单号，整单全部金额退款，暂不支持部分金额退款。

**PosHelper.refund** 退款：
```java
public static boolean refund(Activity activity, String orderNo, String account, 
            List<Product> products, int requestCode) {
```

- 参数说明

  * `activity`: Activity

  * `orderNo`: POS支付单号

  * `account`: 使用方自己的账号

  * `amount`: 退款金额，以分为单位，如100.01元传递10001

  * `products`: 使用方自己的商品信息
   
  * `requestCode`: 对应 Activity的startActivityForResult(Intent, int) 中的requestCode参数

退款示例：

```java
List<PosHelper.Product> products = new ArrayList<PosHelper.Product>();
products.add(new PosHelper.Product("abc000001", "护肤水", 2, 3000));

PosHelper.refund(RefundActivity.this, orderNo, "linqingxuan001", products, 100);

```

退款结果：

```java
public static FFResult.RefundResult getRefundResult(Intent data)
```

**FFResult.RefundResult** 退款结果：

```java
/**
 * POS账号
 */
public final String mPosAccount;
/**
 * POS支付单号
 */
public final String mPayOrderNo;
/**
 * POS退款单号
 */
public final String mRefundOrderNo;
/**
 * POS退款金额（有可能与原订单支付不一致，以该返回金额为实际退款金额） 以分为单位，如100.01元，则应返回10001
 */
public final long mAmount;
```

退款结果示例：

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  if (resultCode == Activity.RESULT_OK) {
    FFResult.RefundResult refundResult = PosHelper.getRefundResult(data);
  } else if (resultCode == Activity.RESULT_CANCELED) {
  }
}
```

#### 3、进入飞凡云POS设置界面

调用PosHelper的setting方法进入飞凡云POS设置界面

```java
public static boolean setting(Activity activity)
```
- 参数说明

  * `activity`: Activity


进入设置界面示例：

```java
PosHelper.setting(EntranceActivity.this);
```

#### 4、查询订单详情
订单查询是基于飞凡POS支付的订单号。调用PosHelper的queryTrade方法。
```java
public static boolean queryTrade(Activity activity, String orderNo, 
    String account, String payOrderNo, List<Product> products, int requestCode)
```

- 参数说明

  * `activity`: Activity

  * `orderNo`: 使用方自己的订单号

  * `account`: 使用方自己的账号

  * `payOrderNo`: POS支付单号

  * `products`: 使用方自己的商品信息
   
  * `requestCode`: 对应 Activity的startActivityForResult(Intent, int) 中的requestCode参数

查询订单详情示例：

```java
List<PosHelper.Product> products = new ArrayList<PosHelper.Product>();
products.add(new PosHelper.Product("abc000001", "护肤水", 2, 3000));
PosHelper.queryTrade(TradeQueryActivity.this, "123456789", "linqingxuan001", payOrderNo,
                products, 100);
```

**FFResult.TradeQueryResult** 查询订单详情结果：

```java
/**
 * 0查询失败{@link #TRADE_QUERY_STATU_FAIL}，1查询成功{@link #TRADE_QUERY_STATU_SUCCESS}；
 */
public final int mStatus;
/**
 * 交易类型
 * 0支付{@link #TRADE_TYPE_PAY}，1退款{@link #TRADE_TYPE_REFUND}，默认-1{@link #TRADE_TYPE_UNKNOWN}；
 */
public final int mTradeType;
/**
 * 支付结果 如果交易类型为1，则该值为null，否则为支付结果数据；如果查询失败则为null
 */
public final PayResult mPayResult;
/**
 * 退款结果 如果交易类型为0，则该值为null，否则为退款结果数据；如果查询失败则为null
 */
public final RefundResult mRefundResult;
```

查询订单详情结果示例：

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  if (resultCode == Activity.RESULT_OK) {
    FFResult.TradeQueryResult queryResult = PosHelper.getTradeQueryResult(data);
    if (queryResult.mStatus == FFResult.TRADE_QUERY_STATU_SUCCESS) {
      if (queryResult.mTradeType == FFResult.TRADE_TYPE_PAY) {
        FFResult.PayResult payResult = queryResult.mPayResult;
      } else if (queryResult.mTradeType == FFResult.TRADE_TYPE_REFUND) {
        FFResult.RefundResult refundResult = queryResult.mRefundResult;
      }
    } else {
    }
  }
}
```

#### 5、核销
核销功能，现在仅支持对飞凡方提供的兑换劵或者提货码进行核销。调用PosHelper的exchange方法。
```java
public static boolean exchange(Activity activity, String code, int requestCode)
```

- 参数说明

  * `activity`: Activity

  * `code`: 核销码(可以不传递)
   
  * `requestCode`: 对应 Activity的startActivityForResult(Intent, int) 中的requestCode参数

核销示例：

```java
PosHelper.exchange(ExchangeActivity.this, code, 100);
```

**FFResult.ExchangeResult** 核销结果：

```java
/**
 * 优惠劵
 */
public static final int EXCHANGE_TYPE_COUPON = 1;
/**
 * 提货码
 */
public static final int EXCHANGE_TYPE_PRODUCT = 2;
/**
 * POS账号
 */
public final String mPosAccount;
/**
 * 核销码
 */
public final String mCode;
/**
 * 核销类型
 */
public final int mType;
/**
 * 商品编码
 */
public final String mProductNo;
/**
 * 商品名称
 */
public final String mProductName;
```

核销结果示例：

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
  if (resultCode == Activity.RESULT_OK) {
    FFResult.ExchangeResult exchangeResult = PosHelper.getExchangeResult(data);
  } else if (resultCode == Activity.RESULT_CANCELED) {
  }
}
```

#### 6、钱箱
飞凡云POS可以通过外接钱箱方式，打开钱箱。

```java
public static void openCashBox(Context context)
```
- 参数说明

  * `Context`: Context

打开钱箱示例：

```java
PosHelper.openCashBox(EntranceActivity.this);
```

#### 7、打印机
飞凡云POS内置打印机，可打印58mm宽度小票。

```java
public static void print(Context context, Data data)
```
- 参数说明

  * `Context`: Context
 
  * `Data`: 打印数据

此外，飞凡云POS还提供几种常用打印样式，涉及打印文字，二维码，条形码等。具体如下：

##### 文字打印
```java
public TextItem(String data, int fontSizeFlag, int alignment)
```
- 参数说明

  * `data`: 打印的文字内容
 
  * `fontSizeFlag`: 打印字体大小，可选择FONT_SIZE_FLAG_NORMAL（普通字体）或者FONT_SIZE_FLAG_BIG（大字体）
  
  * `alignment`: 对齐方式，可选择ALIGNMENT_LEFT（靠左对齐，默认值），ALIGNMENT_CENTER（居中对齐）或者ALIGNMENT_RIGHT（靠右对齐）

##### 带分割线的文字打印
```java
public MarkTextItem(String data, String mark, int fontSizeFlag)
```
- 参数说明

  * `data`: 打印的文字内容
 
  * `mark`: 分割线打印的内容
  
  * `fontSizeFlag`: 打印字体大小，可选择FONT_SIZE_FLAG_NORMAL（普通字体）或者FONT_SIZE_FLAG_BIG（大字体）
 
##### 列表类文字打印
```java
public ColumnsTextItem(int fontSizeFlag, String... data)
```
- 参数说明

  * `fontSizeFlag`: 打印字体大小，可选择FONT_SIZE_FLAG_NORMAL（普通字体）或者FONT_SIZE_FLAG_BIG（大字体）
 
  * `data`: 打印的文字内容
  
##### 条码打印
```java
public BarcodeItem(String data)
```
- 参数说明
 
  * `data`: 打印的条码内容
  
##### 二维码打印
```java
public QRCodeItem(String data)
```
- 参数说明
 
  * `data`: 打印的条码内容

##### 走纸
```java
public FeedPaperItem(int lineCnt)
```
- 参数说明
 
  * `lineCnt`: 走纸行数

调用打印机整体示例：

```java
List<PrintItem> itemList = new ArrayList<>();
itemList.add(new BarcodeItem("123123"));
itemList.add(new TextItem("销售单"));
itemList.add(new MarkTextItem("商户联", "="));
itemList.add(new ColumnsTextItem("订单编号", "abc123"));
itemList.add(new FeedPaperItem(1));
itemList.add(new QRCodeItem("www.wanda.com"));

PosHelper.print(PrinterActivity.this, new Data().addPage(itemList));
```

### 三、附录

#### 支付类型数值对照表


| 对象名称        | 对应值           | 支付类型  |
| ------------- |:-------------:| -----:|
| PAY_TYPE_METRO_CARD   | 2002  | 公交卡 | 
| PAY_TYPE_FEIFAN_CARD  | 2004  | 飞凡卡 | 
| PAY_TYPE_BANK_CARD  | 2005  | 银行卡 | 
| PAY_TYPE_POINT  | 2006  | 积分 | 
| PAY_TYPE_WECHAT | 1404  | 微信 | 
| PAY_TYPE_KUAIQIAN | 1802  | 快钱 | 
| PAY_ TYPE_FEIFAN  | 1101  | 飞凡付款码 | 

#### 核销类型数值对照表
| 对象名称        | 对应值           | 支付类型  |
| ------------- |:-------------:| -----:|
| EXCHANGE_TYPE_COUPON  | 1 | 优惠劵| 
| EXCHANGE_TYPE_VOUCHER | 2 | 提货码| 



# HTML5开发者

## JSSDK使用文档

**概述:**

- `JS-SDK` 是飞凡网内部向网页开发者提供的网页开发工具包

- 通过使用 `JS-SDK`, 网页开发者可借助 `js-bridge` 调用手机等设备的功能

- 此文档面向网页开发者介绍 `JS-SDK` 如何使用及相关注意事项

**JSSDK使用步骤:**

### 步骤一: 引入JS文件

在需要调用JS接口的页面引入JS文件，（支持https）：
> http://nres.ffan.com/newactivity/umd/ffan-bo-jssdk-0.0.5.min.js

### 步骤二: 通过 `config` 接口注入权限验证配置

<p><font color=red>所有需要使用JS-SDK的页面必须先注入配置信息, 到后台去进行验证, 否则无法调用</font></p>

```javascript
ffanSDK.config({
    developerKey："66f6a62fa73ad8c961e121efe695fea2",  //第三方应用developerKey
    ts："1486628893",  //签名时使用的时间戳
    nonceStr："XX4L3FX6vgorRFf3lklnP8Cp",  //用来生成签名的随机串
    signature："c3f94fa5ea84885eda0ab7c2cf350fa428cd2b3a",  //生成的签名
    url : "http%3A%2F%2Flocal.xa.com",  //当前页面的url 请使用urlEncode对url进行处理
});
```

### 步骤三: 通过 `ready` 接口处理成功验证

```javascript
ffanSDK.ready(function(sdk) {
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
  // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口
  // 放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，
  // 不需要放在ready函数中。
})

```

### 步骤四: 通过 `error` 接口处理失败验证

```javascript
ffanSDK.error(function(res) {
  // config 信息验证失败会执行 error 函数
  // 如签名过期导致验证失败, 具体错误信息可以打开 config 的 debug 模式查看
  // 也可以在返回的 res 参数中查看
});
```

## 接口调用说明

以下示例代码中的`sdk` 实例对象可通过 `ffanSDK.ready` 函数获取到，或者当接口是在用户触发才调用时，也可以直接通过`ffanSDK` 对象来调用。

**打开指定的H5页面接口**

```javascript
sdk.openWebPage({ "url": "http://www.baidu.com" })

```

**关闭当前H5页面接口**

```javascript
sdk.closeWindow()
```

**获取设备信息接口** 

```javascript
sdk.getDevInfo().then(function(data) {
  // success
}).catch(function () {
  // fail
})
```

- 调用成功的返回值: 

```json
{
  "name": "iOS_Wifi", //设备名称
  "model": "营销", //设备类型
  "systemVersion": "1.0.0", //系统版本
}
```

**获取启动参数接口** 

```javascript
sdk.getEnvInfo().then(function(data){
  // success
}).catch(function(err){
  //fail
})
```

- 调用成功的返回值: 

```json
{
  "wid": "d0da5e64a7515694878fad2f906d5937", //店铺的唯一标识
  "storeName": "门店名称", //店铺的名称
  "storeAddress": "北京市朝阳区", //店铺的地址
  "storeLogo": "http://img1.ffan.com/T1GPbTByCy1RCvBVdK", //门店的logo
  "org": "wanda" //信息来源的标识
  "userId":""     //商户登陆账号ID
  "userType": "1"  //角色，1-店长、2-店员、3-商户
}
```
**获取位置信息接口** 

```javascript
sdk.getLocation().then(function(data) {
  //success
}).catch(function(err) {
  // fail
})
```

- 调用成功的返回值

```json
{
  "lot": "116.46", //经度
  "lat": "39.92", //维度
}
```

**设置页面标题接口** 

```javascript
sdk.setTitle({ "title": "飞凡demo" })

```

## H5授权接口说明

###  **`accessToken` 说明**

- `accessToken` 是开放平台的全局唯一票据, 第三方应用调用各接口时都需使用 `accessToken`。开发者需要进行妥善保存

- `accessToken` 的存储至少要保留 512 个字符空间

- `accessToken` 的有效期目前为 7200 秒, 需定时刷新, 重复获取将导致上次获取的 `accessToken` 失效

**开放平台的API调用所需的 `accessToken` 的使用及生成方式说明**

  * **中控服务器**. 为了保密 `developerSecrect`, 第三方需要一个 `accessToken` 获取和刷新的中控服务器。而其他业务逻辑服务器所使用的 `accessToken` 均来自于该中控服务器, 不应该各自去刷新, 否则会造成 `accessToken` 覆盖而影响业务。

  * **刷新过程**. 目前 `accessToken` 的有效期通过返回的 `expiresIn` 来传达, 目前是 7200 秒。中控服务器需要根据这个有效时间提前去刷新新 `accessToken`。在刷新过程中, 中控服务器对外输出的依然是老 `accessToken`, 此时开放平台后台会保证在刷新短时间内, 新老 `accessToken` 都可用, 这保证了第三方业务的平滑过渡。

  * **主动刷新,被动刷新**. `accessToken` 的有效时间可能会在未来有调整, 所以中控服务器不仅需要内部定时主动刷新, 还需要提供被动刷新 `accessToken` 的接口, 这样便于业务服务器在 `API` 调用获知 `accessToken` 已超时的情况下, 可以触发 `accessToken` 的刷新流程。

**获取资源接口调用凭证【accessToken】接口说明**

  - 请求样例

```bash
curl -X POST -d "developerKey=bo8b4f85f3a794d99&developerSecret=cd02f64be56af9a6603c4ad6858f5256" http://api.ffan.com/oauth/v1/token
```

  - 接口调用频率: 2000 次 / 天（ 00:00:00 - 23:59:59 ）

  - 参数说明

    * **developerKey**: 第三方应用 `developerKey`

    * **developerSecret**: 第三方应用的的密钥

  - 返回值说明

```json
// 成功:
{
  "status": 200,  // int 型, 200 表示成功,
  "message": "ok",  // string 型,  对 status 的说明,
  "data":{
    "accessToken":"86f7e437faa5a7fce15d1ddcb9eaeaea377667b8",  // string 型 , 资源接口调用凭证
    "expiresIn":7200  // int 型 accessToken 的过期时间 单位秒
  }
}
```

```json
// 失败:
{
  "status": 4000,  // int 型, 4000 表示客户端错误, 5000 表示服务端内部错误 ,
  "message": "param error"  // string 型, 对 status 的文字描述
}
    ```

  - 错误码对照表


| 错误码 | 错误说明 |
| :--- | :----- |
| 4001 | developerKey 参数错误 |
| 4002 | developerSecret 参数错误 |
| 5001 | 服务器存储错误 |

### **`accessToken` 的签名说明**

**签名算法**

- 参与签名的字段: `accessToken`（资源调用凭证）、`developerKey`（第三方应用的 developerKey）、`nonceStr`（随机字符串）、`ts`（当前时间戳）、`url`（调用 JS 接口页面的完整 URL, 不包含 # 及其后面部分）

- 对所有待签名参数按照字段名的 `ASCII` 码从小到大排序（字典序）后, 使用URL键值对的格式（即 key1=value1&key2=value2…）拼接成字符串 `str1`

- 这里需要注意的是所有参数名均为小写字符。对 `str1` 作 `SHA256` 加密, 字段名和字段值都采用原始值, 不进行 `URL` 转义。

  <p><font color=red>注意: 出于安全考虑, 开发者必须在服务器端实现签名的逻辑</font></p>

- 签名算法示例

  1\. 待签名字段

```javascript
accesstoken=1f7f568afa4204326fede5cc17472b8a535ca39f
developerkey=3b997a1c75a61c26fd0576f814f51df6
noncestr=abcdeaasdfasdf
ts=1486351078
url=http://m.ffan.com?a=b&c=d
```

  2\. 对所有待签名参数按照字段名的 `ASCII` 码从小到大排序（字典序）后, 使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串 `string1`

```javascript
accesstoken=1f7f568afa4204326fede5cc17472b8a535ca39f&developerkey=3b997a1c75a61c26fd0576f814f51df6&noncestr=abcdeaasdfasdf&ts=1486351078&url=http://m.ffan.com?a=b&c=d
```

  3\. 对 `string1` 进行 `SHA256` 签名, 得到 `signature`

```
928dfbcabb55bc663a925306f11e2ab17c4a6d65
```

**验证accessToken的签名是否正确接口说明**

- 请求样例

```bash
curl -X GET http://api.ffan.com/oauth/v1/token/sign?developerKey=bo8b4f85f3a794d99&ts=1484727098&nonceStr=asd1ada&signature=86f7e437faa5a7fce15d1ddcb9eaeaea377667b7&url=http%3A%2F%2Fm.ffan.com%3Fa%3Db%26c%3Dd
```

- 接口调用频率: 200000 次 / 天（00:00:00 - 23:59:59）

- 参数说明

  * **developerKey**: 第三方应用 developerKey

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
| 4001 | developerKey 参数错误 |
| 4004 | accessToken 参数错误 |
| 4005 | nonceStr 参数错误 |
| 4006 | url 参数错误 |
| 4007 | ts 参数错误 |
| 4010 | 签名参数错误或者签名无效 |

**生成 `accessToken` 的签名接口说明**

<p><font color=red>注意: 此接口仅仅是为了方便开发者调试签名, 实际业务中请第三方应用在自己的服务端实现签名逻辑</font></p>

- 请求样例

  ```bash
  curl  -X POST -d "accessToken=86f7e437faa5a7fce15d1ddcb9eaeaea377667b8&developerKey=bo8b4f85f3a794d99&nonceStr=asd1ada&ts=1484727098&url=http%3A%2F%2Fm.ffan.com%3Fa%3Db%26c%3Dd" http://api.ffan.com/oauth/v1/token/sign
  ```

- 接口调用频率: 200 次 / 天（00:00:00 - 23:59:59）

- 参数说明

  * `accessToken`: 资源接口的调用凭证

  * `developerKey`: 第三方应用 developerKey

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
| 4001 | developerKey 参数错误 |
| 4004 | accessToken 参数错误 |
| 4005 | nonceStr 参数错误 |
| 4006 | url 参数错误 |
| 4007 | ts 参数错误 |


# iOS开发者

## FAP小应用类型


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

>Sublime Text，Deco，WebStorm， nuclide

### 项目集成
#### 下载SDK（含Demo工程）

通过以下链接下载SDK和Demo：
[SDK下载](http://static.ffan.com/bo/iOS.ffoap-alpha.zip)

#### iOS FFOAPSDK介绍

##### FFOAPSDK结构

pod安装后效果如下：
![](http://img1.ffan.com/T1eIbTBCbX1RCvBVdK)

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
![](http://img1.ffan.com/T1NehTBsAv1RCvBVdK)

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
![](http://img1.ffan.com/T1fPVTBXYX1RCvBVdK)

##### 配置Info.plist
如下图所示，修改Info.plist，配置定位权限，访问相册权限和自定义字体
![](http://img1.ffan.com/T1tTxTBQYT1RCvBVdK)

### 开发APP
以zhihu为例
1. 在工程同级目录下创建文件夹FFOAP/applications/zhihu
2. 在zhihu中添加js代码，完成FAP小程序 App开发
![](http://img1.ffan.com/T1IThTBTAv1RCvBVdK)

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
![](http://img1.ffan.com/T1_TJTBgh_1RCvBVdK)
![](http://img1.ffan.com/T1AvVTByLX1RCvBVdK)

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
![](http://img1.ffan.com/T1nvWTBQZj1RCvBVdK)


### 验证

1. 获取应用ID
待通过审核，应用上架后，点击应用图标，打开链接如下http://open.ffan.net/apps/detail/1101，应用ID即为：**app_1101**
2.  修改native代码，在FFOAPRootViewController添加如下代码，配置demo列表数据源
``` objectivec
{
   FFOAPCellModel *model = FFOAPCellMake(@"知乎Demo",@"",@"app_1101");
   [array addObject:model];
}
```
3. 模拟器或真机运行Demo，点击列表对应项，即可下载app_1101对应的app，进行线上验证。

## H5类型

### H5 APP 概述

使用Webkit渲染，跨平台的web应用。基于WebViewJavascriptBridge实现与native的交互，获取部分native能力。

>iOS参考链接：https://github.com/marcuswestin/WebViewJavascriptBridge

>Android参考链接：https://github.com/gzsll/WebViewJavascriptBridge

### Hybrid iOS SDK

#### Hybrid iOS SDK简介

Hybrid SDK 核心部分包括一个控制器FFHybridViewController，一个协议FFHybridWidget，以及一组实现FFHybridWidget协议的Widget，开发者也可以按需要实现自己的Widget。

![](http://img1.ffan.com/T1peJTBjdg1RCvBVdK)

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


# FAQ
### 1、上传失败
请检查以下内容
* 要使用打包工具打包
* 必须指定文件夹打包
* config.json文件是否存在
* FAP小程序的包大小不能超过5M
### 2、提交失败
请检查以下内容
* rn包目录不允许有空格，否则导致找不到config.json，提交失败
* 提交双平台时，config.json中要有rnframeworkVersionIOS和rnframeworkVersionAndroid字段
### 3、js语法错误，调试时不显示js错误行数，只是卡在99%不动
请升级nodejs到6.6版本以上

### 4、本地调试正常，远程打包应用报错
请检查入口类是否使用export default class导出默认类

### 5、iOS运行正常，安卓运行崩溃
请检查使用的styles里面是不是重复写了属性，如(padding:10, padding:20)，这种情况iOS是可以覆盖而安卓会启动崩溃

### 6、文本框iOS使用正常，安卓推出两次
请按照下面例子的方式调用
```
<TextInput
ref={component => this._textInput = component}
blurOnSubmit={false}
onSubmitEditing={this._onSubmitEditing.bind(this)}
/>

_onSubmitEditing(event) {
this._textInput.blur();
console.log('do something')
}
```