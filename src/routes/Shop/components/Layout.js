import React from 'react'
import '../../../styles/_base.scss'

class Layout extends React.Component {

  render() {
    return <div className="height-100">{this.props.children}</div>

  }
}

export default Layout;
