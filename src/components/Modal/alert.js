import React, {Component, PropTypes} from 'react';
import Mask from '../Mask';
import s from './Modal.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DelayRenderer from '../Protal/DelayRenderer';
import classnames from 'classnames';
import * as funcUtils from '../utils/functionUtil'

const Alert = ({active, children, ...props}) => {

  return <div className={classnames(s.modal, s.alert, { [s.active]: active })}>
    <div className={s.modalInner}>
      <div className={s.modalText}>
        {children}
      </div>
      <div className={s.modalButtons}>
        <span className={s.btn} onClick={e=>{
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

export default withStyles(s)(Alert);