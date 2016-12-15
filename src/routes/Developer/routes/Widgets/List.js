import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppsList from '../../components/Apps/List'
import fetchUtil from '../../../utils/fetchUtil'
class AppList extends React.Component {
  async componentDidMount() {
      const apiUrl = `http://10.1.115.14:8006/bo/v1/web/developer/1/app`
      try {
        const res = await fetchUtil.postJSON(apiUrl);
        console.log(res)
      } catch (e) {
        console.log(e)
      }
  }
  render() {
    return <AppsList />
  }
}

module.exports = {
  path: 'list',
  component: AppList
}
export default AppList;