import React from 'react';
import './github.scss'
import html from 'html!./content/develop.md'

class MarkdownContent extends React.Component {
  render() {
    return <div id="github" dangerouslySetInnerHTML={{ __html: html }}/>
  }
}

export default MarkdownContent
