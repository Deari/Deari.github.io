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
      className  : "layout",
      cols       : 2,
      rowHeight  : 100,
      selectedCls: 'selected',
      width      : 240,
      margin     : [ 0, 0 ],
    }
  }

  onLayoutChange(layout) {
    this.props.setLayout(layout.map(l => ({
      i: l.i, w: l.w, h: l.h, x: l.x, y: l.y
    })))
  }

  generateLayout(e) {
    let { layout } = this.props.preview
    try {
      const lay = layout.find(l => l.i === e.id)
      return lay || { ...e.defaultLayout, ...{ x: 0, y: Infinity } }
    } catch (e) {
      alert(e)
    }
  }

  generateDOM() {
    const elements = this.props.preview.elements
    return elements.map(e => {
      const className = e.selected ? 'selected' : ''
      return <div key={e.id}
                  className={className}
                  onClick={this.props.selectElement.bind(null, e.id)}
                  data-grid={this.generateLayout(e)}>
        <Element {...e} layout={this.generateLayout(e)}/>
      </div>
    })
  }

  render() {
    const { canDrop, isOver, connectDropTarget, preview, gridProps } = this.props
    //const isActive = canDrop && isOver;
    //const layout = preview.layout
    return connectDropTarget(

          <div className="shop-info">
            <ReactGridLayout className="layout"
                             {...gridProps}
                             onLayoutChange={::this.onLayoutChange}>
              {this.generateDOM()}
            </ReactGridLayout>
          </div>

    )
  }

}

export default Preview

//{<pre style={{ "fontSize": '10px', "top": 0,"position": 'absolute' }}>
//         {JSON.stringify(this.props, null, 2)}
//         </pre>}
