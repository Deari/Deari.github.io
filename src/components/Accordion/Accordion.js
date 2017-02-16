import React, { Component, PropTypes, Children } from 'react'
import Collapse from './Collapse'
import invariant from 'invariant'

export class Accordion extends Component {

  state = {
    activeIndex: 0
  }

  getCollapses() {
    const { children } = this.props
    return Children.map(children, (child, index) => {
      invariant(child.type === Collapse, 'The children\'s type of Accordion ' +
        'must be <Collapse/>')
      const CollapseProps = {
        isActive: this.state.activeIndex === index,
        onSelect: () => {
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
