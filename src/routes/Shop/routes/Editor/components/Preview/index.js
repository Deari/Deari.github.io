import React, { Component, PropTypes } from 'react'
import ReactGridLayout from 'react-grid-layout'

import './Preview.scss'

import Element from '../../containers/ElementContainer'

export class Preview extends Component {

  componentDidMount() {
    setTimeout(this.props.fetchPreview, 1000)
  }

  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    setLayout: PropTypes.func.isRequired,
    preview: PropTypes.object.isRequired,
    fetchPreview: PropTypes.func.isRequired,
  }

  static defaultProps = {
    gridProps: {
      className: "layout",
      cols: 4,
      rowHeight: 47,
      selectedCls: 'selected',
      width: 210,
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

  generateStyle(e) {
    if (e.moduleType !== 'html5') {
      return {
        backgroundSize: 'cover',
        backgroundImage: `url(${e.appPreviewImage})`,
      }
    } else {
      return {}
    }
  }

  generateDOM() {
    if (!this.props.preview) {
      return null
    }
    const elements = this.props.preview.elements

    return elements.map(e => {
      const className = e.selected ? 'selected' : ''
      return <div key={e.id}
                  style={this.generateStyle(e)}
                  className={className}
                  onClick={this.props.selectElement.bind(null, e.id)}
                  data-grid={this.generateLayout(e)}>
        <Element {...e} layout={this.generateLayout(e)} gridProps={this.props.gridProps}/>
      </div>
    })
  }

  render() {
    const { canDrop, isOver, connectDropTarget, preview, gridProps } = this.props
    return connectDropTarget(
      <div className="shop-info">
        <div className="mobile-header">
          <img className="clock" src="http://img1.ffan.com/T1hOJTB_WT1RCvBVdK" />
          <div className="mobile-headerInfo">
            <i className="iconfont icon-leftarrow"></i>
            <h3 className="title">GAP(金地中心店)</h3>
            <i className="iconfont icon-search"></i>
          </div>
        </div>
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

