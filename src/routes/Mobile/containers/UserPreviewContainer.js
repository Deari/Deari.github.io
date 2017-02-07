import React, { Component } from 'react'
import UserPreview from '../components/UserPreview'
import fetchUtil from 'utils/fetchUtil'
import {getDomain}  from 'utils/domain';
import UserViewData from './data'


export const Promised = (Wrapped) => class extends Component {

  state = {
    preview: {
      elements: [],
      layouts: [],
    }
  }

  async componentDidMount() {
    try {
      const apiUrl = getDomain('http://api.intra.sit.ffan.net/bo/v1/web/merchant/page/3')
      const res = await fetchUtil.getJSON(apiUrl)
      if(res.status==200){
        if (typeof res.data.viewData === 'string') {
          res.data.viewData = JSON.parse(v.data.viewData)
        }
        this.setState({ preview: res.data.viewData })
      }
    } catch (e) {
      console.log('---UserView data error')
      console.log(e)
      this.setState({preview: UserViewData})
    }
  }

  render() {
    return <Wrapped {...this.state.preview} />
  }
}

export default Promised(UserPreview)
