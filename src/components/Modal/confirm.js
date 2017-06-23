import React, { Component, PropTypes } from 'react'
import Mask from '../Mask'
import './Modal.scss'
import DelayRenderer from '../Protal/DelayRenderer'
import classnames from 'classnames'
// import * as funcUtils from '../utils/functionUtil'

const Confirm = ({ active, children, ...props }) => {
  return <div className={classnames('modal', 'confirm', { 'active': active })}>
    <div className={'modalInner'}>
      <div className={'modalText'}>
        {children}
      </div>
      <div className={'modalButtons'}>
        <div className={'btn'} onClick={props.onCancel}>{props.cancelBtnText}</div>
        <div className={'btn'} onClick={props.onConfirm}>{props.confirmBtnText}</div>
      </div>
    </div>
  </div>
}

Confirm.propTypes = {
  active: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

Confirm.defaultProps = {
  active: false,
  onCancel: () => {},
  onConfirm: () => {},
  confirmBtnText: '确定',
  cancelBtnText: '取消'
}

export default Confirm
