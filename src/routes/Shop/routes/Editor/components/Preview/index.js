import React, { Component, PropTypes } from 'react'
import ReactGridLayout from 'react-grid-layout'

import Element from '../../containers/ElementContainer'
import './Preview.scss'
export class Preview extends Component {

  componentDidMount() {
    console.log(this.props.pageID)
    // setTimeout(()=>{
      this.props.fetchPreview(this.props.pageID)
    // }, 1000)
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
      className: "preview-layout",
      cols: 4,
      rowHeight: 52.5,
      selectedCls: 'selected',
      width: 212,
      margin: [ 0, 0 ],
    }
  }

  onLayoutChange = (layouts) => {
    this.props.onLayoutChange();
    this.props.setLayout(layouts.map(l => ({
      i: l.i, w: l.w, h: l.h, x: l.x, y: l.y
    })))
  }

  onDragStart = (layouts, l) => {
    this.props.selectElement(l.i);
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
                  onClick={(e)=>{ e.stopPropagation() }}
                  data-grid={this.generateLayout(e)}>
        <Element {...e} layout={this.generateLayout(e)} gridProps={this.props.gridProps}/>
      </div>
    })
  }

  render() {
    const { canDrop, isOver, connectDropTarget, preview, gridProps } = this.props
    return connectDropTarget(
      <div className="shop-info" onClick={()=>{ this.props.cancelElement()}}>
        <ReactGridLayout {...gridProps} className="preview-layout"
                         onDragStart={this.onDragStart} 
                         onLayoutChange={this.onLayoutChange}>
          {this.generateDOM()}
        </ReactGridLayout>
      </div>
    )
  }

}

export default Preview

