import React, { Component, PropTypes } from 'react'
import ReactGridLayout from 'react-grid-layout'

import './Preview.scss'

import Element from '../../containers/ElementContainer'

export class Preview extends Component {

  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    setLayout: PropTypes.func.isRequired,
    preview: PropTypes.object.isRequired,
  }

  static defaultProps = {
    gridProps: {
      className: "layout",
      cols: 2,
      rowHeight: 47,
      selectedCls: 'selected',
      width: 212,
      margin: [ 0, 0 ],
    }
  }

  onLayoutChange(layouts) {
    this.props.setLayout(layouts.map(l => ({
      i: l.i, w: l.w, h: l.h, x: l.x, y: l.y
    })))
  }

  generateLayout(e) {
    let { layouts } = this.props.preview
    try {
      const lay = layouts.find(l => l.i === e.id)
      return lay || { ...e.defaultLayout, ...{ x: 0, y: Infinity } }
    } catch (e) {
      alert(e)
    }
  }

  generateDOM() {
    const elements = this.props.preview.elements
    return elements.map(e => {
      const className = e.selected ? 'selected' : ''
      console.log(e)
      return <div key={e.id}
                  style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${e.appPreviewImage})`,
                  }}
                  className={className}
                  onClick={this.props.selectElement.bind(null, e.id)}
                  data-grid={this.generateLayout(e)}>
        <Element {...e} layout={this.generateLayout(e)}/>
      </div>
    })
  }

  render() {
    const { canDrop, isOver, connectDropTarget, preview, gridProps } = this.props
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

