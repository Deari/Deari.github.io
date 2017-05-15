import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './association.scss'
import { validate } from '../modules/validate'
import DescribeIcon from 'components/DescribeIcon'

class AssociationModule extends Component {
  state={
    appActive:0,
    widgetActive:0,
    hardwareActive:0
  }
  onchange (e) {
    if (e.target.name === 'app') {
      if (e.target.checked) {
        this.setState({ appActive:1 })
      } else {
        this.setState({ appActive:0 })
      }
    } else if (e.target.name === 'widget') {
      if (e.target.checked) {
        this.setState({ widgetActive:1 })
      } else {
        this.setState({ widgetActive:0 })
      }
    } else {
      if (e.target.checked) {
        this.setState({ hardwareActive:1 })
      } else {
        this.setState({ hardwareActive:0 })
      }
    }
  }
  onAppDelete (item, index) {
    this.props.handleLogochange(item.logo, 'app')
    this.props.handleIdchange(item.id, 'app')
    this.props.handleNamechange(item.name, 'app')
  }
  onWidgetDelete (item, index) {
    this.props.handleLogochange(item.logo, 'widget')
    this.props.handleIdchange(item.id, 'widget')
    this.props.handleNamechange(item.name, 'widget')
  }
  componentWillReceiveProps () {
    const { appObj, weiObj } = this.props
    if (Array.isArray(appObj) && appObj.length != 0) {
      this.setState({ appActive: 1 })
    }
    if (Array.isArray(weiObj) && weiObj.length !== 0) {
      this.setState({ widgetActive: 1 })
    }
  }
  render () {
    const { appActive, widgetActive, hardwareActive } = this.state
    const { appObj, weiObj } = this.props
    const describeContent = `商家在使用应用时，必须配套使用一下关联的组件、硬件、应用。因为勾选以下组件、硬件、应用后，代表商家无法单独使用此应用，必须与勾选项配套使用。商家在下载应用时，应用详情页中，会展示配套使用的组件、硬件、应用。`
    return (
      <div className='association'>
        <div className='form-row'>
          <label>配套使用</label>
          <div className='row-right max-width'>
            <p className='association-text'>
						应用在创建的配套使用的组件、硬件、应用后，只有当它们全部是已发布状态，才会显示在市场中展示。
					</p>
            <p className='association-text'>应用市场详情页的显示，如下图：<i /></p>
            <div>
              <div className='row-radio'>
                <input id='widget' type='checkbox' name='widget' onChange={this.onchange.bind(this)} checked={this.state.widgetActive} />
                <span>
                  <i className='iconfont icon-radio1 icon-recommend' />
                  <i className='iconfont icon-radio icon-recommend' />
                </span>
              </div>
              <label className='labelCheckbox' htmlFor='widget'>组件</label>
              <ul className={classnames({ 'active': widgetActive })}>
                {
		             weiObj.map((item, id) => (
  <li className='logo-box' key={item.id}>
    <img src={item.logo} />
    <i className='iconfont icon-del' onClick={this.onWidgetDelete.bind(this, item)} />
    <p>{item.name}</p>
  </li>
		             ))
		          }
                <li className='logo-box logo-default' onClick={() => { this.props.toggleActive({ trim:1, type:'widget' }) }}>
                  <span><i className='iconfont icon-add' />选择</span>
                </li>
              </ul>
            </div>
            <div>
              <div className='row-radio'>
                <input id='hardware' type='checkbox' name='hardware' onChange={this.onchange.bind(this)} />
                <span>
                  <i className='iconfont icon-radio1 icon-recommend' />
                  <i className='iconfont icon-radio icon-recommend' />
                </span>
              </div>
              <label className='labelCheckbox' htmlFor='hardware'>硬件</label>
              <ul className={classnames({ 'active': hardwareActive })}>
                <li className='logo-box logo-default' onClick={() => { this.props.toggleActive({ trim:1, type:'hardware' }) }}>
                  <span><i className='iconfont icon-add' />选择</span>
                </li>
              </ul>
            </div>
            <div>
              <div className='row-radio'>
                <input id='app' type='checkbox' name='app' onChange={this.onchange.bind(this)} checked={this.state.appActive} />
                <span>
                  <i className='iconfont icon-radio1 icon-recommend' />
                  <i className='iconfont icon-radio icon-recommend' />
                </span>
              </div>
              <label className='labelCheckbox' htmlFor='app'>应用</label>
              <ul className={classnames({ 'active': appActive })}>
                {
		             appObj.map((item, id) => (
  <li className='logo-box' key={item.id}>
    <img src={item.logo} />
    <i className='iconfont icon-del' onClick={this.onAppDelete.bind(this, item)} />
    <p>{item.name}</p>
  </li>
		             ))
		          }
                <li className='logo-box logo-default' onClick={() => { this.props.toggleActive({ trim:1, type:'app' }) }}>
                  <span><i className='iconfont icon-add' />选择</span>
                </li>
              </ul>
            </div>
          </div>
          <DescribeIcon describeId='AssociationModule' describeContent={describeContent} />
        </div>
      </div>
    )
  }
}

export default AssociationModule
