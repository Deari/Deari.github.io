import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import s from './index.scss'

class Search extends Component {
  state = {
    clearBtn: false
  }

  static defaultProps = {
    onSearch: () => {}
  };

  changeHandler (e) {
    if (e.target && e.target.value && e.target.value.trim()) {
      this.setState({ clearBtn: true })
    } else {
      this.setState({ clearBtn: false })
    }
  }

  onKeyUp (e) {
    if (e.keyCode === 13) {
      this.searchHandler()
    }
  }

  clear () {
    this.refs._input.value = ''
  }

  searchHandler () {
    const val = this.refs._input.value.trim()
    this.props.onSearch(val)
    this.clear();
  }

  render () {
    const { placeholder, style, onSearch } = this.props
    const { clearBtn } = this.state

    return (
      <span style={style} className="bo-search">
        <i className='iconfont icon-search'
          onClick={::this.searchHandler} />
        <input
          type='text'
          placeholder={placeholder}
          ref='_input'
          onKeyUp={::this.onKeyUp}
          onChange={::this.changeHandler}
        />
        { clearBtn ? <i className='iconfont '
          onClick={::this.clear}
          >&times;</i> : null
        }
      </span>
    )
  }
}

export default Search
