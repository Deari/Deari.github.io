import React, { Component, PropTypes, Children } from 'react'

export class Collapse extends Component {

  static propTypes = {
    children: PropTypes.arrayOf(React.PropTypes.node).isRequired,
    isActive: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    isActive: false
  }

  render() {
    const children = this.props.children
    const title = children[ 0 ]
    const content = children[ 1 ]

    const titleProps = {
      onClick: () => {
        this.props.onSelect(this.props.isActive)
      }
    }

    const contentProps = {
      style: {
        display: this.props.isActive ? 'inherit' : 'none'
      }
    }

    return <div>
      {React.cloneElement(title, titleProps)}
      {React.cloneElement(content, contentProps)}
    </div>
  }

}

export default Collapse
