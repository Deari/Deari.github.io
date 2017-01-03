import React, { Component } from 'react'
import { Responsive, WidthProvider, ReactGridLayout } from 'react-grid-layout'
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import './grid-layout.scss'
import Element from '../../Shop/routes/Editor/containers/ElementContainer'
export default class UserPreview extends Component {

  static defaultProps = {
    gridProps: {
      className: "layout",
      rowHeight: 80,
      selectedCls: 'selected',
      width: 667,
      margin: [ 0, 0 ],
    }
  }

  getLayout(layouts, id) {
    return { ...layouts.find(layout => layout.i == id), 'static': true }
  }

  generateStyle(e) {
    if (e.moduleType !== 'html5') {
      return {
        backgroundSize: 'cover',
        backgroundImage: `url(${e.appPreviewImage})`,
      }
    } else {
      return {}
    }
  }


  generateDOM() {
    const { layouts, elements } = this.props
    return elements.map(e => <div style={this.generateStyle(e)}
                                  data-grid={this.getLayout(layouts, e.id)}
                                  key={e.id}>
      <Element {...e} layout={this.getLayout(layouts, e.id)} gridProps={this.props.gridProps}/>
    </div>)
  }

  render() {
    return (
      <ResponsiveReactGridLayout {...this.props.gridProps}
                                 cols={{ xxs: 2, xs: 2, md: 2, sm: 2, lg: 2 }}
      >
        {this.generateDOM()}
      </ResponsiveReactGridLayout>
    )
  }
}
