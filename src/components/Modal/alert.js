import React, { Component, PropTypes } from 'react';
import './Modal.scss';
import classnames from 'classnames';

const Alert = ({ active, hideButtons, modalCls, children, ...props }) => {

  return <div className={classnames('modal', 'alert', { [`${modalCls}`]: modalCls }, { ['active']: active })}>
    <div className={classnames('modalInner')}>
      <div className={'modalText'}>
        {children}
      </div>
      {!hideButtons &&
      <div className={'modalButtons'}>
        <span className={'btn'} onClick={e => {
          props.onClose();
          props.onConfirm();
        }}>确定</span>
      </div>
      }
    </div>
  </div>;
}

Alert.propTypes = {
  hideButtons: PropTypes.bool,
  active: PropTypes.bool,
  modalCls: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
}

Alert.defaultProps = {
  hideButtons: false,
  active: false,
  modalCls: '',
  onClose: () => {},
  onConfirm: () => {},
}

export default Alert;
