export const PageTypes = {
  'apps': '应用',
  'widgets':'组件',
  'hardware': '硬件'
}

export const HardwareLinks = {
  doc: 'http://iotdev.ffan.net/zh-cn/developer/document/1',
  list: 'http://iotdev.ffan.net/zh-cn/developer/product/all',
  create: 'http://iotdev.ffan.net/zh-cn/developer/product/create',
  goods:'/hardware/goodsmanage',
  order:'/hardware/ordermanage'
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
  to: `/${type}/devtools`,
  label: '开发者工具',
  icon: 'tool',
}, {
  to: `/${type}/doc`,
  label: '开发者文档',
  icon: 'file',
}]

export const appType = {
  '0': 'icon-rnpng',
  '1': 'icon-hpng',
  '2': 'icon-apkpng'
}
