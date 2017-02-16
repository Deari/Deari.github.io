import React, { Component, PropTypes, Children } from 'react'
import Collapse from './Collapse'

export class Accordion extends Component {

  state = {
    activeIndex: 0
  }

  getCollapses() {
    const { children } = this.props
    return Children.map(children, (child, index) => {
      const CollapseProps = {
        isActive: this.state.activeIndex === index,
        onClickTitle: () => {
          this.setState({ activeIndex: index })
        },
      }
      return React.cloneElement(child, CollapseProps)
    })
  }

  render() {
    return <div className="Accordion">
      {::this.getCollapses()}
    </div>
  }
}



export default Accordion
