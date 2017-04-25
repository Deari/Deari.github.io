export const getPageLinks = (page) => {
  const _pages = {
    'app': {
      prefix: 'apps',
      desc: '应用'
    },
    'widget': {
      prefix: 'widgets',
      desc: '组件'
    }
  }

  const _page = _pages[page] || _pages['app']
  const { prefix, desc } = _page

  return [{
    to: `/${prefix}/list`,
    label: `我的${desc}`,
    icon: 'application'
  },{
    to: `/${prefix}/analytics`,
    label: `${desc}数据统计`,
    icon: 'application'
  },{
    to: `/applyAccount`,
    label: '申请测试账号',
    icon: 'application'
  },{
    to: `/${prefix}/doc`,
    label: '开发者文档',
    icon: 'file'
  }]
}


