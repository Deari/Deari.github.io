import React, {Component, PropTypes} from 'react';
import './Modal.scss';
import classnames from 'classnames';

const Alert = ({active, children, ...props}) => {

  return <div className={classnames('modal', 'alert', { ['active']: active })}>
    <div className={'modalInner'}>
      <div className={'modalText'}>
        {children}
      </div>
      <div className={'modalButtons'}>
        <span className={'btn'} onClick={e=>{
          props.onClose();
          props.onConfirm();
        }}>确定</span>
      </div>
    </div>
  </div>;
}

Alert.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
}

Alert.defaultProps = {
  active: false,
  onClose: () => {},
  onConfirm: () => {},
}

export default Alert;
