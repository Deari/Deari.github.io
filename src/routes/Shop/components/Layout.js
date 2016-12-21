import React from 'react'
import '../../../styles/_base.scss'

class Layout extends React.Component {

  render() {
    return <div className="bg-gray height-100">
      <div className="container pt10">
        <div className="row">
          {this.props.children}
        </div>
      </div>
    </div>
  }
}

export default Layout;
