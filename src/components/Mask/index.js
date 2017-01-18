import React, { Component, PropTypes } from 'react';
// https://github.com/facebook/react/blob/master/src/renderers/dom/client/ReactMount.js#L390-L401
import { unmountComponentAtNode, findDOMNode } from 'react-dom';
import Protal from '../Protal';
import './Mask.scss';
import classnames from 'classnames';


class Mask extends Component {

  componentWillUpdate (nextProps) {
    if (nextProps.active && !this.props.active) {
      this.bodyOverflow = document.body.style.overflow;
      document.querySelector('html').style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    if (!nextProps.active && this.props.active) {
      document.querySelector('html').style.overflow = this.bodyOverflow || null;
      document.body.style.overflow = this.bodyOverflow || null;
    }
  }

  render() {
    const {active, className, children, onOverlayClick} = this.props;
    const _className = classnames('overlay overlay-container', {
      'active': active,
    }, className);

    return <Protal>
      <div className={_className} >
        <div className={'backdrop'}
             onClick={e=> {
               e.preventDefault();
               onOverlayClick();
             }}></div>
        {children}
      </div>
    </Protal>
  }
}

export default Mask;
