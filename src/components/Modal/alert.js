import React, { Component, PropTypes } from 'react'
import './Modal.scss'
import classnames from 'classnames'

const Alert = ({ active, hideButtons, modalCls, children, ...props }) => {
  const onClose = props.onClose
  return <div className={classnames('modal', 'alert', { [`${modalCls}`]: modalCls }, { 'active': active })}>
    <div className={classnames('modalInner')}>
      <div className={'modalText'}>
        {props.title ? <h3 className='popup-title'><p className='icon-turnoff' onClick={props.onClose}>关闭</p>选择{props.text ? props.text : '应用'}</h3> : ''}
        {children}
      </div>
      {!hideButtons &&
      <div className={'modalButtons'}>
        <span className={'btn'} onClick={e => {
          props.onClose()
          props.onConfirm()
        }}>确定</span>
      </div>
      }
    </div>
  </div>
}

Alert.propTypes = {
  hideButtons: PropTypes.bool,
  active: PropTypes.bool,
  modalCls: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func
}

Alert.defaultProps = {
  hideButtons: false,
  active: false,
  modalCls: '',
  onClose: () => {},
  onConfirm: () => {}
}

export default Alert
