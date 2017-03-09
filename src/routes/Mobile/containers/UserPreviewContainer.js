import React, { Component } from 'react'
import UserPreview from '../components/UserPreview'
import fetchUtil from 'utils/fetchUtil'
import {getMobileDomain}  from 'utils/domain';
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
      const apiUrl = getMobileDomain('web/merchant/page/'+this.props.params.pageID)
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
