const APPLIST_FILTERS =  [
  {
    filter: 'ALL',
    text: '全部',
    status: 0
  },
  {
    filter: 'WAIT_REVIEW',
    text: '待审核',
    status: 1
  },
  {
    filter: 'REVIEWED',
    text: '已审核',
    status: 2
  },
  {
    filter: 'WAIT_SUBMIT',
    text: '待提交',
    status: 3
  }
]

const REVIEW_STATUS = [
  { value: 0, status: 'waitSubmit', text: '准备提交', style: { backgroundColor: '#fff028' } },
  { value: 4, status: 'waitSubmit', text: '保存草稿', style: { backgroundColor: '#fff028' } },
  { value: 1, status: 'reviewing', text: '审核中', style: { backgroundColor: '#fff028' } },
  { value: 2, status: 'waitPublish', text: '等待开发者发布', style: { backgroundColor: '#fff028' } },
  { value: 3, status: 'nopass', text: '审核不通过', style: { backgroundColor: '#ff5628' } }
]

const PUBLISH_STATUS = {
  status: 'published',
  text: '已发布',
  style: { backgroundColor: '#91e43c' }
}

const UNSHELVED_STATUS = [
  { status: 'adminUnshelved', text: '被管理员下架', style: { backgroundColor: '#ff5628' } },
  { status: 'devUnshelved', text: '被开发者下架', style: { backgroundColor: '#ff5628' } }
]

export function judgeAppStatus (app) {
  const { adminUnshelved, devUnshelved, publishStatus, reviewStatus } = app

  if (adminUnshelved || devUnshelved) {
    return app.adminUnshelved ? UNSHELVED_STATUS[0] : UNSHELVED_STATUS[1]
  }

  if (publishStatus) {
    return PUBLISH_STATUS
  }
  return REVIEW_STATUS.find((t) => +t.value === reviewStatus)
}


export default APPLIST_FILTERS