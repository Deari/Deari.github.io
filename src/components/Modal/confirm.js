import React, {Component, PropTypes} from 'react';
import Mask from '../Mask';
import s from './Modal.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DelayRenderer from '../Protal/DelayRenderer';
import classnames from 'classnames';
import * as funcUtils from '../utils/functionUtil'

const Confirm = ({active, children, ...props}) => {

  return <div className={classnames(s.modal, s.confirm, { [s.active]: active })}>
    <div className={s.modalInner}>
      <div className={s.modalText}>
        {children}
      </div>
      <div className={s.modalButtons}>
        <div className={s.btn} onClick={props.onCancel}>{props.cancelBtnText}</div>
        <div className={s.btn} onClick={props.onConfirm}>{props.confirmBtnText}</div>
      </div>
    </div>
  </div>;
}

Confirm.propTypes = {
  active: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

Confirm.defaultProps = {
  active: false,
  onCancel: () => {},
  onConfirm: () => {},
  confirmBtnText: '确定',
  cancelBtnText: '取消'
}

export default withStyles(s)(Confirm);