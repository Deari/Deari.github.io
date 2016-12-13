import React, { Component, PropTypes } from 'react'
import ReactGridLayout from 'react-grid-layout'

import './Preview.scss'

import Element from '../../containers/ElementContainer'

export class Preview extends Component {

  static propTypes = {
    canDrop          : PropTypes.bool.isRequired,
    isOver           : PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props
    //const isActive = canDrop && isOver;

    var layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];
    return connectDropTarget(
      <div>
        <pre style={{ "fontSize": '14px' }}>
          {JSON.stringify(this.props, null, 2)}
        </pre>
        <div className="preview-container">
          <ReactGridLayout className="layout" layout={layout} cols={4} rowHeight={30} width={300}>
            <div key={'a'}>a</div>
            <Element key={'b'} name="aaa"/>

            <div key={'c'}>c</div>
          </ReactGridLayout>
        </div>
      </div>
    )
  }

}

export default Preview
