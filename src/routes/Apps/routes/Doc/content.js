import React from 'react';
import './github.scss'


class MarkdownContent extends React.Component {
  render() {
    return <div id="github" dangerouslySetInnerHTML={{ __html: this.props.html || '' }}/>
  }
}

export default MarkdownContent
