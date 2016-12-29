import React, { Component } from 'react'
import { Responsive, WidthProvider, ReactGridLayout } from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import './grid-layout.scss'

export default class UserPreview extends Component {

  generateDOM() {
    const { layouts, elements } = this.props
    return elements.map(e => <div key={e.id}>{e.appName}</div>)
  }

  render() {
    const { layouts, elements } = this.props
    return (
      <ResponsiveReactGridLayout className="user-preview-container"
                                 layout={layouts} cols={{ xxs: 2, xs: 2, md: 2, sm: 2, lg: 2 }}
                                 rowHeight={30}>
        {this.generateDOM()}
      </ResponsiveReactGridLayout>
    )
  }
}
