# 一、概述

飞凡IoT云平台是致力于物联网、智能硬件云服务的开放平台。飞凡IoT云专注于提供智能云服务及物联网的软硬件解决方案 ，帮助传统硬件厂商产品升级，快速实现硬件智能化。要实现硬件的智能化，除了硬件本身外，还需要实现：智能云平台、联网模块，每一个领域都需要专业的团队来支撑。飞凡IoT云提供完整的解决方案，让厂商或开发者只需要专注于自身产品硬件。以最小的成本和风险实现硬件智能化，获得产品最大的增值。本文主要介绍设备接入飞凡IoT云基本流程。

# 二、设备与飞凡IoT云数据交互流程

以一款空调为例。空调厂家开发者开发空调电控板的时候，使用移植飞凡IoT云GAgent的WiFi/GPRS模组建立桥梁，使空调设备的数据与飞凡IoT云互联互通。设备与飞凡IoT云数据交互的基本数据流如下图。
![Alt text](http://img1.ffan.com/T100ETB5Dv1RCvBVdK)

# 三、在飞凡IoT云官网创建设备产品

这里以“智能灯”的例子介绍设备接入飞凡IoT云的整个流程。

## 1、注册飞凡IoT云开发者账号

进入飞凡IoT云官网开发者中心， 根据界面指引注册开发者账号。
![Alt text](http://img1.ffan.com/T1o6WTBCD_1RCvBVdK)

## 2、登录账号，选择对应项创建新产品
![Alt text](http://img1.ffan.com/T1D2hTBbxT1RCvBVdK)

## 3、填写设备产品基本信息
![Alt text](http://img1.ffan.com/T1fUWTBCA_1RCvBVdK)

## 4、项目基本信息
在飞凡IoT云官网上已成功创建宠物屋产品，飞凡IoT云为该产品分配Product Key和Product Secret参数。Product Key参数由开发者写入设备MCU（设备主控板），并告知WiFi/GPRS模块，WiFi/GPRS模块登录飞凡IoT云后，飞凡IoT云将会识别该Product Key的产品。Product Secret参数是APP开发或服务器对接时所使用的参数。
![Alt text](http://img1.ffan.com/T1i7ETBmWv1RCvBVdK)

## 5、创建数据点
数据点即设备产品的功能的抽象，用于描述产品功能及其参数。创建数据点后，设备与云端通讯的数据格式即可确定，设备、飞凡IoT云可以相互识别设备与飞凡IoT云互联互通的数据。
![Alt text](http://img1.ffan.com/T1gOJTB7WT1RCvBVdK)

## 6、数据点详解
数据点定义基本内容可分为显示名称，标识名，读写类型，数据类型及备注。概图如下：
![Alt text](http://img1.ffan.com/T1X7JTBsJT1RCvBVdK)

1\.标识名:
用于应用层传输，客户端或业务云开发时需要使用。命名规则遵循标准的开发语言变量名命名规范，支持英文字母、数字和下划线，以英文字母开头。

2\.读写类型:
* 只读：表示该数据点非控制，数据只支持从设备上报。

* 可写：表示该数据点可控制。设备端可上报该数据点数据；云端/客户端可对该数据点数据做出下发控制。

* 报警：表示该数据点非控制，数据只支持从设备上报，数据类型需为布尔值。

* 故障：表示该数据点非控制，数据只支持从设备上报，数据类型需为布尔值。云端会对设备上报的该数据点做统计，可在“运行状态”查看。

3\.数据类型:
* 布尔值：表示两个状态：0，或1。如开关状态等，建议使用布尔数据类型。例如GoKit开发板的“宠物屋”，“开启/关闭红色灯”该数据点。

* 枚举类型：可定义一个有限的取值集合。当定义的某个功能（元器件）有固定的若干个值。例如GoKit开发板的“宠物屋”，“设定LED组合颜色”该数据点的枚举定义值：“自定义,黄色,紫色,粉色”。

* 数值：填写数值范围，数值可为负数/小数，飞凡IoT云自动将数值转换为正数。例如GoKit开发板的“宠物屋”，“设定电机转速”该数据点：电机有正反转、调速功能，数据点值可定义为：-5～5。

* 扩展：填写数据长度，数据内容由用户自定义。对于上述功能点无法满足的复杂功能可采用。飞凡IoT云不建议使用此类型数据，设备上报该数据点的数据，飞凡IoT云无法识别。

4\.数据点数值型分辨率:
* 如以上提到，在定义数值型数据点的时候，取值范围可以使用包括小数、负数等非uint类型数值，熟悉嵌入式开发的开发者会知道，这些数值在设备端都是不被支持的。

* 飞凡IoT云为了让设备功能定义更加简单直接、所见即所得，研究出来一套算法，用于将用户输入的数值转换成设备能够识别的uint类型，这套算法的核心公式是：y=kx+m。

* y表示“显示值”，就是用户可见的最终数值，也是数据点定义时输入的值。包括 Ymin(最小值) 和 Ymax(最大值)。

* x表示“传输值”，就是实际指令间传输使用的数值，云端/客户端接收到的值。一定是uint格式。也包括 Xmin 和 Xmax。

* k表示“分辨率”，就是用户输入的分辨率一值，确定了每个取值的步进。

* m表示“取值偏移量”或“增量”，算法通过m值将y值偏移到满足x值uint格式的要求，m值默认等于Ymin，确保Xmin＝0 。

* 以下用一个电子温度计举例说明换算过程 数据点内容：
```bash
-30（Ymin） ~ 50（Ymax），分辨率：0.1
根据公式：y=kx＋m，m默认等于Ymin -30
Xmin = (-30+30) / 0.1 = 0
Xmax = (50+30) / 0.1 = 800 
```

## 7、根据产品需求，分析硬件开发需求:
“智能灯”的产品需求是：将灯的开关状态同步到手机APP，可以使用APP远程控制灯。

* 结合设备功能需求，分析设备数据点需求
![Alt text](http://img1.ffan.com/T1kUWTBgJv1RCvBVdK)

* 创建对应数据点
![Alt text](http://img1.ffan.com/T1L2hTBg_T1RCvBVdK)

* 修改数据点
![Alt text](http://img1.ffan.com/T1j2JTByCv1RCvBVdK)
![Alt text](http://img1.ffan.com/T137xTBCxT1RCvBVdK)
![Alt text](http://img1.ffan.com/T1EUVTBvEg1RCvBVdK)

## 8、智能灯MCU开发:

* 自动生成MCU SDK
自动生成的MCU SDK代码实现了飞凡IoT云通信协议的解析与封包、传感器数据与通信数据的转换逻辑，并封装成了简单的 API。当设备收到云端或 APP 端的数据后，程序会将数据转换成对应的事件并通知到应用层，开发者只需要在对应的事件处理逻辑中添加传感器的控制函数，便可完成产品的开发。这里选择独立MCU方案、硬件平台STM32f103c8x后，飞凡IoT云直接生成适应STM32f103c8x的工程代码。利用GoKit开发板上的扩展接口，A2和GND进行扩展外接LED灯。
![Alt text](http://img1.ffan.com/T1AOhTBg_T1RCvBVdK)
![Alt text](http://img1.ffan.com/T152hTB5xT1RCvBVdK)

* MCU SDK文件内容目录结构
如下图，其中黑色标注部分为STM32f103cx8硬件平台开发基本文件。绿色标注部分为飞凡IoT云逻辑部分，硬件的串口驱动、定时器驱动、按键驱动等驱动实现完毕，开发者可直接在Gizwits_product.c&Gizwits_product.h文件编写硬件动作执行函数。
![Alt text](http://img1.ffan.com/T16OxTBKAT1RCvBVdK)

其中主要文件说明：

### 1.文件说明
Gizwits_product.c	
该文件为产品相关处理函数，如gizEventProcess()平台相关硬件初始化，如串口、定时器等。
Gizwits_product.h	
该文件为gizwits_product.c的头文件，存放产品相关宏定义如：HARDWARE_VERSION、SOFTWARE_VERSION
Gizwits_protocol.c	
该文件为SDK API接口函数定义文件
Gizwits_protocol.h	
该文件为gizwits_protocol.c对应头文件，相关API的接口声明均在此文件中。

### 2.协议API介绍

API名称	API功能
Void gizwitsInit(void)	gizwits 协议初始化接口。
用户调用该接口可以完成 Gizwits 协议相关初始化（包括协议相关定时器、串口的初始化）。
Void gizwitsSetMode(unit8_t mode)	参数mode[in]：仅支持0,1和2,其他数据无效。
参数为 0，恢复模组出厂配置接口，调用会清空所有配置参数，恢复到出厂默认配置; 参数为 1 时配置模组进入 SoftAp 模式； 参数为 2 配置模组进入 AirLink 模式。
Void gizwitsHandle(dataPoint_t \*dataPoint)	参数 dataPoint[in]:用户设备数据点。
该函数中完成了相应协议数据的处理即数据上报的等相关操作。
Int8_t gizwitsEventProcess (eventInfo\_t \*info,uint8\_t \*data,uint32\_t len)	
参数 info[in]:事件队列参数 ; 
     data[in]:数据; 
参数 len [in]:数据长度。
用户数据处理函数,包括 wifi 状态更新事件和控制事件。a) Wifi 状态更新事件WIFI_开头的事件为 wifi 状态更新事件，data 参数仅在WIFI_RSSI 有效，data 值为 RSSI 值,数据类型为 uint8_t，取值范围 0~7。 b) 控制事件与数据点相关,本版本代码会打印相关事件信息，相关数值也一并打印输出，用户只需要做命令的具体执行即可。

## 9、开发步骤:

1\.程序主函数

位置：main.c 中 main()函数
![Alt text](http://img1.ffan.com/T1ocWTBmV_1RCvBVdK)

相关说明(函数说明)：

* SystemInit()	平台相关的硬件初始化 （非 MCU SDK API，不同的平台名称可能不同）

* userInit() 用户相关的初始化，如：外设驱动初始化、打印串口初始化（非MCU SDK API，不同的平台名称可能不同） 

* gizwitsInit()	平台、协议处理初始化，如：用户定时器初始化、协议通信串口初始化（MCU SDK API）

* userHandle()	用户事件回调函数，用户可以自定义事件在该函数中完成相应的协议处理。（非MCU SDK API，不同的平台名称可能不同）

* gizwitsHandle()	协议相关的主函数（MCU SDK API）

2\.编写驱动程序

位置：main.c 中 userInit() 函数
![Alt text](http://img1.ffan.com/T1n2xTByYT1RCvBVdK)

3\.用户程序初始化

位置：main.c 中 userInit() 函数
 ![Alt text](http://img1.ffan.com/T1XmLTBTh_1RCvBVdK)

4\.WiFi模块Reset/入网方式

设备需要进入配置模式才能进行联网，并与云端进行通信，MCU SDK在工程中是通过按键触发进入相应的配置模式。这里，我们简单地添加成功触发WiFi模组进入AirLink配置模式后LED灯亮起。

* 进入 Soft AP 模式：key2 按键短按。
![Alt text](http://img1.ffan.com/T1ncLTBvd_1RCvBVdK)

* 进入 AirLink 模式：key2 按键长按。
![Alt text](http://img1.ffan.com/T1AobTBvVg1RCvBVdK)

* 模组复位：key1 按键长。
![Alt text](http://img1.ffan.com/T1GOhTBKCT1RCvBVdK)

5\.处理云端/APP发送过来的控制事件

与控制型协议相关的函数调用关系如下：
 ![Alt text](http://img1.ffan.com/T1X7hTBTET1RCvBVdK)

 函数调用说明：

 ### 1\.函数说明

 * protocolIssuedProcess	该函数被 gizwitsHandle 调用，接收来自云端或 app端下发的相关协议数据，MCU SDK自处理，开发者可不关注

 * ACTION_CONTROL_DEVICE	进行“控制型协议”的相关处理，MCU SDK自处理，开发者可参考协议进一步理解

 * gizDataPoint2Event	根据协议生成“控制型事件”，并进行相应数据类型的转化转换，MCU SDK自处理，开发者可参考协议进一步理解 

 * gizwitsEventProcess	根据已生成的“控制型事件”进行相应处理（包括相应的驱动函数），需开发者处理控制事件 


 ### 2\.相关代码位置

 \.\.\.\Gizwits\gizwits_product.c 中 gizwitsEventProcess() 函数


 ### 3\.功能说明

 完成写类型外设的事件处理。

 ### 4\.相应代码
 ![Alt text](http://img1.ffan.com/T1i2JTB4Zv1RCvBVdK)

 6\.上报设备状态

 与上报型协议相关的函数调用关系如下：
 ![Alt text](http://img1.ffan.com/T1S2JTB4Av1RCvBVdK)

 函数调用说明：

 ### 1\.函数说明

 * userHandle	获取用户区的上报型数据，需开发者关注

 * gizCheckReport	判断是否上报当前状态的数据，MCU SDK自处理，开发者可不关注

 * gizDataPoints2ReportData	完成用户区数据到上报型数据的转换，MCU SDK自处理，开发者可不关注 

 * gizReportData	将转换后的上报数据通过串口发送给 WiFi 模块，MCU SDK自处理，开发者可不关注
 

 ### 2\.相关代码位置

 \.\.\.\User\main.c 中 userHandle() 函数


 ### 3\.使用说明

 该函数中完成了用户区上报型数据的获取。用户只需将读到的数据赋值到 用户区当前设备状态结构体即可，赋值完的数据是通过 gizwitsHandle 上报云端的，开发者不需要关注变化上报和定时上报。

# 四、产测工具使用文档

## 1、产测简介

产测是生产环节中重要的部分，保证了产品的质量，提升自身产品形象。机智云产测工具为批量生产的产品提供了方便快捷的模块与MCU产测方式。在大型生产时，保证模块与MCU可正常使用。
该文档为产测使用流程，硬件如何开启产测模式请参考产品开发资源中MCU开发资源文档。

## 2、产测前准备

### 1\.产品上架

使用产测工具，必须让产品先上架。由产品创建者向机智云申请发布。机智云将免费为你提供人工审核以及严谨的测试。
 ![Alt text](http://img1.ffan.com/T10mLTBgV_1RCvBVdK)
> 按要求填写发布申请表单，提交申请后寄送设备样品，我们会在5～7个工作日完成审核工作。
申请发布成功后，才可进行产测文件生成以及产测App下载。

### 2\.生成产测文件

![Alt text](http://img1.ffan.com/T1ZUWTBbxv1RCvBVdK)

产品上架后，在产品服务中点击“添加配置文件”

![Alt text](http://img1.ffan.com/T152ETBvEv1RCvBVdK)

输入配置名称后，点击“添加步骤”添加需要进行的产测步骤，产测数据点为设备定义数据点。每点击一次“添加步骤”可以添加一个数据点步骤。指令添加完成后点击保存，会生成一个产测文件。

### 3\.下载产测app

在产测文件下方点击“产测App下载”即可扫码下载App至手机中。（产测App只提供android版本）
![Alt text](http://img1.ffan.com/T1l7xTByYT1RCvBVdK)

### 4\.下载产测文件

![Alt text](http://img1.ffan.com/T1rOhTBjbT1RCvBVdK)
打开产测app后，点击下载配置文件会弹出二维码扫描框，点开设备产品配置文件下载，扫描二维码，手机端即可得到产测文件。


## 3、开始产测

* 把设备配置成厂测模式，这时候设备的wifi模组会自动连上GIZWITS_TEST_1或者GIZWITS_TEST2路由器。装有厂测APP的手机也需要连到这个路由器。
 
* 点击app端开始测试按钮，进入产测状态，界面显示正在搜索设备。当有设备被发现的时候，将对设备进行测试。
 
* 界面上方显示总发现设备数，测试成功设备数，测试失败的设备数。

* 测试设备列表中依次显示的设备顺序为：测试中的设备、待测试的设备、失败的设备、成功的设备。
点击查看，可以看到具体的测试内容:
1\.点击停止按钮，将出现弹框提示，并结束本次测试，保存测试结果。

## 4、查看产测结果日志

* 停止产测后，打开app菜单栏，选择测试报告选项，可查看历史测试报告。测试报告的名字为测试的时间，最新测试的结果排在最前面。
 
* 测试报告中可查看本次测试的合格产品和不合格产品数量以及MAC地址。
长按相应的栏目可以删除单条记录：
1\.点击菜单可选择删除全部记录。
2\.点击对应的栏目，可以看到具体测试的设备，失败的设备优先排列在最前面。
3\.点击查看可以看到具体的测试内容。
