import React, {Component, PropTypes} from 'react';
import Mask from '../Mask';
import './Modal.css';
import DelayRenderer from '../Protal/DelayRenderer';
import Alert from './alert';
import Confirm from './confirm';

class Modal extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    active        : PropTypes.bool,
    onClose       : PropTypes.func.isRequired,
    onOverlayClick: PropTypes.func,
  }

  static defaultProps = {
    type: 'alert',
    active        : false,
    onClose       : () => {},
    onOverlayClick: () => {},
  }

  getModalContent(type) {
    const { active, children, ...props} = this.props;
    let content;
    switch(type) {
      case 'alert':
        content = <Alert {...props} active={active}>
          {children}
        </Alert>
        break;
      case 'confirm':
        content = <Confirm {...props} active={active}>
          {children}
        </Confirm>
        break;
      default:
        content = null;
    }
    return content
  }

  render() {
    const {active, children, type, ...props} = this.props;

    return <Mask {...props} active={active}>
      {this.getModalContent(type)}
    </Mask>;
  }
}

export default DelayRenderer()(Modal)

