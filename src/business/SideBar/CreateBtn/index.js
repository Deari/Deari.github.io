import React from 'react';
import { Link } from 'react-router';
import { HardwareLinks, PageTypes } from 'config/index'
import s from '../index-new.scss'
// <Link to={`/${type}/create`}>{`创建新${PageTypes[type]}`}</Link>
const CreateBtn = ({ type })=> {
  return <button className={s.createBtn}>
    <i className='iconfont icon-create' />
    { type ==='hardware' ? <a href={`${HardwareLinks.create}`}>创建新硬件</a>
       : <a href={`/${type}/create`}>{`创建新${PageTypes[type]}`}</a> }
  </button>
}

export default CreateBtn;