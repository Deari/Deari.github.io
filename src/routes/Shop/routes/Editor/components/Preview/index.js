import React, { Component, PropTypes } from 'react'
import ReactGridLayout from 'react-grid-layout'

import './Preview.scss'

import Element from '../../containers/ElementContainer'

export class Preview extends Component {

  static propTypes = {
    canDrop          : PropTypes.bool.isRequired,
    isOver           : PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    setLayout        : PropTypes.func.isRequired,
    preview          : PropTypes.object.isRequired,
  }

  static defaultProps = {
    gridProps: {
      className: "layout",
      cols     : 2,
      rowHeight: 100,
      selectedCls : 'selected',
      width    : 310,
      margin   : [0,10],
    }
  }

  onLayoutChange(layout) {
    this.props.setLayout(layout.map(l => ({
      i: l.i, w: l.w, h: l.h, x: l.x, y: l.y
    })))
  }

  generateLayout(e) {
    const { layout } = this.props.preview
    return layout[ e.id ] ? layout[ e.id ] : { ...e.defaultLayout, ...{ x: 0, y: Infinity } }
  }

  generateDOM() {
    const elements = this.props.preview.elements
    return elements.map(e => {
      const className = e.selected ? 'selected' :  ''
      return <div key={e.id}
                                  className={className}
                                  onClick={this.props.selectElement.bind(null, e.id)}
                                  data-grid={this.generateLayout(e)}>
      <Element {...e} />
    </div>})
  }

  render() {
    const { canDrop, isOver, connectDropTarget, preview, gridProps } = this.props
    //const isActive = canDrop && isOver;
    //const layout = preview.layout
    return connectDropTarget(
      <div>
        <div className="preview">
          <div className="bg-phone"></div>
          <div className="shop-info">
              <ReactGridLayout className="layout"
                               {...gridProps}
                             onLayoutChange={::this.onLayoutChange}>
              {this.generateDOM()}
            </ReactGridLayout>
            </div>
        </div>
        <pre style={{ "fontSize": '12px', "top": 0,"position": 'absolute' }}>
          {JSON.stringify(this.props, null, 2)}
        </pre>
      </div>
    )
  }

}

export default Preview
