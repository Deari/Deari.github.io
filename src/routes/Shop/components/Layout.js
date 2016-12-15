import React from 'react'
import { IndexLink, Link } from 'react-router'

class Layout extends React.Component {

  render() {
    return <div id="editor-main">
      <div>{this.props.children}</div>
    </div>
  }
}

export default Layout;
