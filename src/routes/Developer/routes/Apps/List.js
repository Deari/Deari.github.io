import React from 'react'
import { IndexLink, Link } from 'react-router'
import AppsList from '../../components/Apps/List';
import fetch from '../../../../../fetch'
import fetchUtil from '../../../utils/fetchUtil.js';

class AppList extends React.Component {
  async componentDidMount() {
    try {
      const res = await fetch(`http://10.1.115.14:8006/bo/v1/web/developer/1/app`);
       if (res.ok) {
          const resp = await res.json();
       }
      console.log()
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

// /bo/v1/web/app/${appId}