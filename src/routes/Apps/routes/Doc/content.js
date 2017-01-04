import html from './content/develop.md'
import React from 'react';
import marked from 'marked';
import './github.scss'
import highlight from 'highlight.js'

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  },
  gfm: true,
  breaks: true,
  //pedantic: false,
  //sanitize: false,
  //smartLists: true,
  //smartypants: false
});

class MarkdownExample extends React.Component {
  getMarkdownText() {
    //var rawMarkup = marked(html, {sanitize: true});
    var rawMarkup = marked(html);
    return { __html: rawMarkup };
  }
  render() {
    return <div id="github" dangerouslySetInnerHTML={this.getMarkdownText()} />
  }
}

export default MarkdownExample
