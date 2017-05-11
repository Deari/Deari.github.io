import React, { Component, PropTypes } from 'react'
import './ClockDetail.scss'

export class ClockDetail extends Component {

  state = {
    fontFamily: 'Helvetica'
  }

  onFontClick = fontFamily => {
    const { element, onChange } = this.props
    this.setState({ fontFamily })
    onChange(element, { fontFamily })
  }

  render () {
    const fonts = [
      { fontFamily: 'Helvetica', name: 'Helvetica' },
      { fontFamily: 'Georgia', name: 'Georgia' },
      { fontFamily: 'Times New Roman', name: 'Times New Roman' },
      { fontFamily: 'Verdana', name: 'Verdana' },
      { fontFamily: 'STSong', name: 'STSong' }
    ]

    return <div id='clock-detail-container'>
      <h3>字体：</h3>
      <ul className='nav nav-pills'>
        {fonts.map(font =>
          <li className={`nav-item`}>
            <a className={`nav-link ${this.state.fontFamily === font.fontFamily ? 'active' : ''}`}
              value={font.fontFamily} onClick={this.onFontClick.bind(this, font.fontFamily)}>
              {font.name}</a>
          </li>
        )}
      </ul>
    </div>
  }
}

ClockDetail.defaultProps = {
  onChange: () => {}
}

export default ClockDetail
