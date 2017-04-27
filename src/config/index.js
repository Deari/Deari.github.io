export const PageTypes = {
  'apps': '应用',
  'widgets':'组件',
  'hardware': '硬件'
}

export const DocLink = (type) => {
  let docLink = (type == 'hardware') ? `http://iotdev.ffan.net/zh-cn/developer/document/1` : `/${type}/doc`
  return docLink
}

export const getPageLinks = (type) => {
  return [{
    to: `/${type}/list`,
    label: `我的${PageTypes[type]}`,
    icon: 'application'
  },{
    to: `/${type}/analytics`,
    label: `${PageTypes[type]}数据统计`,
    icon: 'sidebar3',
    hide: (type == 'hardware') ? true : false
  },{
    to: `/applyAccount`,
    label: '申请测试账号',
    icon: 'application',
    hide: (type == 'hardware') ? true : false
  },{
    to: DocLink(type),
    label: '开发者文档',
    icon: 'file',
    isExternal: (type == 'hardware') ? true : false
  }]
}