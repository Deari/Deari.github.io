import React from 'react';
import marked, { Renderer } from 'marked';
import highlightjs from 'highlight.js'
import './github.scss'
import html from './content/develop.md'

//const renderer = new Renderer()
//renderer.code = (code, language) => {
//  // Check whether the given language is valid for highlight.js.
//  const validLang = !!(language && highlightjs.getLanguage(language));
//  // Highlight only if the language is valid.
//  const highlighted = validLang ? highlightjs.highlight(language, code).value : code;
//  // Render the highlighted code with `hljs` class.
//  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
//};

class MarkdownContent extends React.Component {

  constructor(props) {
    super(props);
    marked.setOptions({
      //renderer,
      highlight: function (code, lang) {
        if (lang) {
          return highlightjs.highlight(lang, code, true).value;
        } else {
          return highlightjs.highlightAuto(code).value;
        }
      },
      gfm: true,
      breaks: true,
    });
  }

  render() {
    const rawMarkup = marked(html || '')
    return <div id="github" dangerouslySetInnerHTML={{ __html: rawMarkup }}/>
  }
}

export default MarkdownContent
