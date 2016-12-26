import React, { Component } from 'react'
import { Responsive, WidthProvider, ReactGridLayout } from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import './grid-layout.scss'

export default class UserPreview extends Component {
  render() {
    var layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 2, h: 2, minW: 2, maxW: 2 },
      { i: 'c', x: 4, y: 0, w: 1, h: 2 }
    ];
    return (
      <ResponsiveReactGridLayout className="user-preview-container"
                                 layout={layout} cols={{ xxs: 2, lg: 2 }}
                                 rowHeight={30}>
        <div key={'a'}>a</div>
        <div key={'b'}>b</div>
        <div key={'c'}>c</div>
      </ResponsiveReactGridLayout>
    )
  }
}
