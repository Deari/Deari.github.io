import React from 'react'
import { IndexLink, Link } from 'react-router'
import fetchUtil from '../../../utils/fetchUtil.js';
class AppList extends React.Component {
  // async componentDidMount() {
  //   try {
  //      alert()
  //     const res = await fetchUtil.getJSON(`http://10.1.115.14:8006/bo/v1/web/app/7`);
  //     console.log(res)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
  render() {
    return <div>hello 我的应用</div>
  }
}

module.exports = {
  path: 'list',
  component: AppList
}

// /bo/v1/web/app/${appId}