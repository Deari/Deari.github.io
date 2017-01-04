import React from 'react'
import Slidebar from '../../../../components/Sidebar'
import '../../../../components/Header/Header'
import '../../../../styles/_base.scss'
import './index.scss'
import Content from './content'
class Doc extends React.Component {
  render() {
    const urls = {
      create: { url: `/apps/create` },
      list: { url: `/apps/list` },
      doc: { url: `/apps/doc`, active: true }
    }

    return (
    <div className="container clx">
      <Content />
    </div>
    )
  }
}

module.exports = ({
  path: 'doc',
  component: Doc
})
