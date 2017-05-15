export const PageTypes = {
  'apps': '应用',
  'widgets':'组件',
  'hardware': '硬件'
}

export const HardwareLinks = {
  doc: 'http://iotdev.ffan.net/zh-cn/developer/document/1',
  list: 'http://iotdev.ffan.net/zh-cn/developer/product/all',
  create: 'http://iotdev.ffan.net/zh-cn/developer/product/create'
}

export const getPageLinks = (type) => [{
  to: `/${type}/list`,
  label: `我的${PageTypes[type]}`,
  icon: 'application',
}, {
  to: `/${type}/analytics`,
  label: `${PageTypes[type]}数据统计`,
  icon: 'sidebar3'
}, {
  to: `/${type}/doc`,
  label: '开发者文档',
  icon: 'file',
}, {
  to: `/${type}/devtools`,
  label: '开发者工具',
  icon: 'tool',
}]

export const appType = {
  '0': 'icon-rnpng',
  '1': 'icon-hpng',
  '2': 'icon-apkpng'
}
