import React from 'react'
import { IndexLink } from 'react-router'
import cx from 'classnames'
import s from './index-new.scss'

const PageLinks = ({ data, style, className }) => {
  return (
    <ul className={cx(s.root, className)} style={style}>
      {data && data.map((item, index) => {
        return (
          <li key={index} className={s.item}>
            {!item.link ? <IndexLink to={item.to} activeClassName={s.active} >
              <i className={`iconfont icon-${item.icon}`} />{item.label}
            </IndexLink> : item.link }
          </li>
        )
      })}
    </ul>
  )
}

export default PageLinks
