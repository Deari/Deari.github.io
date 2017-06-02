import React, { Component, PropTypes } from 'react'
import './Modal.scss'
import classnames from 'classnames'

const Alert = ({ active, footer, modalCls, children, ...props }) => {
  const onClose = props.onClose
  return <div className={classnames('modal', 'alert', { [`${modalCls}`]: modalCls }, { 'active': active })}>
    <div className={classnames('modalInner')}>
      {props.title && <div className="modalHead">
        <h3 className='popup-title'>{props.title} </h3>
        <i className='icon-turnoff' onClick={props.onClose}>关闭</i>
      </div>}
      <div className="modalBody">
        {children}
      </div>
      {footer &&
      <div className='modalFoot'>
        <span className='button' onClick={e => {
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
