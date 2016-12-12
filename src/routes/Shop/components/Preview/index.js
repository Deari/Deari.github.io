import React, {Component, PropTypes} from 'react'
import './Preview.scss'

export class Preview extends Component{

  static propTypes = {
    //onDrop: PropTypes.func.isRequired,
  }

  render() {
    //console.log(this.props)
    //console.log("-----------")
    //console.log(this.props.dispatch)
    const { canDrop, isOver, connectDropTarget, onDrop } = this.props;
    const isActive = canDrop && isOver;
    return connectDropTarget(<div className="preview-container">
      {JSON.stringify(this.props)}
    </div>)
  }

}

export default Preview
