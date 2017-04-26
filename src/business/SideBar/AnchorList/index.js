import React from 'react'
import { Link, IndexLink } from 'react-router'
import cx from 'classnames'
import s from './index-new.scss'

const PageLinks = ({ data, style, className }) => {
  return (
    <ul className={cx(s.root, className)} style={style}>
      {data && data.map((item, index)=>{
        return (
          <li key={index} className={s.item}>
            <IndexLink to={item.to} activeClassName={s.active} >
              <i className={`iconfont icon-${item.icon}`}></i>{item.label}
            </IndexLink>
          </li>
        )
      })}
    </ul>
  )
}

export default PageLinks