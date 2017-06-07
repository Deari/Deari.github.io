import React from 'react'
import { IndexLink, Link } from 'react-router'
import { connect } from 'react-redux'
import { ActionCreaters as Actions, fetchAppList } from 'reducers/appStore'
import Login from 'components/Login'
import Search from 'components/Search'
import s from './index-new.scss'
import { PageTypes } from 'config/index'

const Header = (props) => {
  const re = props.location.pathname.match(/^\/(apps|widgets)(\/tag\/\d+)?$/)
  let showSearch = false;
  let placeholder = '搜索'
  const searchValue = '';
  if(re) {
    placeholder +=PageTypes[re[1]]
    showSearch = true
  }

  return (
    <div className='header-wrapper'>
      <div className='bg' />
      <div className='site-header'>
        <h1 className='site-title'>
          <i className='site-logo'></i>
          <div className='title'>
            <div className='text'>BO开放平台</div>
            <div className='small'>
              <Link to='/' className='dev'>
                开发者平台
              </Link>
              <Link to='/store/home' className='merchant'>
                商家平台
              </Link>
            </div>
          </div>
        </h1>
        <div className='nav-wrapper'>
          <ul className='site-nav'>
            <li>
              <Link to='/apps' activeClassName='active'>
                应用市场
                <i className='triangle' />
              </Link>
            </li>
            <li>
              <Link to='/widgets' activeClassName='active'>
                组件市场
                <i className='triangle' />
              </Link>
            </li>
            <li>
              <a href='http://apistore.ffan.net' activeClassName='active'>
                API市场
                <i className='triangle' />
              </a>
            </li>
            <li>
              <Link to='/hardware' activeClassName='active'>
                硬件市场
                <i className='triangle' />
              </Link>
            </li>
          </ul>
          <div className={s.search}>
            {showSearch && <Search style={{ 'width': '100%' }} placeholder={placeholder} defaultValue={searchValue}
              onSearch={(v) => {
                props.fetchAppList({
                  tag: 0,
                  params: { appName: v }
                })
              }} onClear={(v) => {
                props.fetchAppList({
                  tag: 0,
                  params: { appName: '' }
                })
              }} /> }
          </div>
          <Login />
        </div>
      </div>
    </div>
  )
}
export default connect((state) => ({}), {
  fetchAppList
})(Header)
