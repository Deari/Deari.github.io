import React from 'react'
import s from './list-new.scss'
import fetchUtil from 'utils/fetch'
import { getDomain } from 'utils/d'
import APPS_FILTERS from 'config/appStatus'
import { appType, PageTypes } from 'config/index'
import { judgeAppStatus } from 'config/appStatus'
import Item from './AppItem'
import Search from 'components/Search'
import Pagination from 'components/Pagination'

function getAppStatus (app) {
  const { versions, adminUnshelved, devUnshelved } = app
  return versions.slice(0, 2).map((v) => {
    const vInfo = judgeAppStatus({
      adminUnshelved,
      devUnshelved,
      publishStatus: v.publishStatus,
      reviewStatus: v.reviewStatus
    })
    return {
      ...vInfo,
      codeVersion: v.codeVersion
    }
  })
}

class AppsTable extends React.Component {
  state = {
    filter: 'ALL',
    list: [],
    total: 0,
    request_params: {
      limit: 1000,
      page: 1,
      appName: '',
      review: ''
    }
  }
  componentDidMount () {
    this.fetchAppsList()
  }

  fetchAppsList (params = {}) {
    const apiUrl = getDomain(`/app/v1/bo/v1/web/developer/${this.props.type}`)
    const { filter, ...rest } = params
    const _filter = filter || this.state.filter
    const { status: review } = APPS_FILTERS.find(function (t) { return t.filter === _filter })
    
    return fetchUtil.getJSON(apiUrl, {
      ...this.state.request_params,
      ...rest,
      review
    }).then(data => {
      const _list = data.list.map(v=>{
        const _appStatus = getAppStatus(v)
        if (_appStatus.length > 1 && _appStatus[0].status === _appStatus[1].status) {
          _appStatus.pop()
        }
        return {
          ...v,
          _appStatus,
          _appKindClassName: appType[v.appKind]
        }
      })
      .filter(v=> {
        if(+v.appId === +this.props.appId) {
          return false
        }
        // return true;
        return v._appStatus.some(item=> item.status === 'published')
      })

      this.setState({
        list: _list || [],
        total: data.page && data.page.totalCount - 1,
        filter: _filter,
        request_params: {
          ...this.state.request_params,
          ...rest
        }
      })
    }).catch(e => {
      console.log('err: ', e)
    })
  }

  onPagination (page, size) {
    this.fetchAppsList({ page })
  }

  onSearch (v = '') {
    this.setState({
      request_params: {
        ...this.setState.request_params,
        appName: v
      }
    })
    this.fetchAppsList({ page: 1, appName: v })
  }

  render() {
    const { type } = this.props;

    return(
      <div className={s.content}>
        <div className={s.search}>
          <Search onSearch={::this.onSearch}
            onClear={::this.onSearch} placeholder={`输入${PageTypes[type]}名称搜索`} />
        </div>
        <div className={s.tableWrapper}>
          <table className={`site-table ${s.table}`} cellSpacing='0' cellPadding='0'>
            <thead>
              <tr>
                <th>Logo</th>
                <th>{PageTypes[type]}名称</th>
                <th>价格</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map(v=>{
                return <Item {...this.props} key={v.appId} data={v}></Item>
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
}

export default AppsTable;
