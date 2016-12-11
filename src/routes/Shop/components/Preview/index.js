import React, {Component} from 'react'
import './Preview.scss'

export class Preview extends Component{
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(<div className="preview-container">
      {JSON.stringify(this.props)}
    </div>)
  }

}

export default Preview
