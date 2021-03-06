import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import s from './index.scss'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clearBtn: false,
      value: props.defaultValue
    }
  }

  static defaultProps = {
    onSearch: () => {}
  };

  changeHandler (e) {
    if (e.target && e.target.value && e.target.value.trim()) {
      this.setState({ clearBtn: true, value: e.target.value })
    } else {
      this.setState({ clearBtn: false, value: '' })
    }
  }

  onKeyUp (e) {
    if (e.keyCode === 13) {
      this.searchHandler()
    }
  }

  clear () {
    this.setState({ value: '', clearBtn: false })
    this.props.onClear && this.props.onClear();
  }

  componentWillReceiveProps(nextProps) {
    const { defaultValue } = nextProps;
    if(typeof defaultValue === 'undefined') {
      this.setState({ clearBtn: !!this.state.value })
    } else {
      this.setState({ value: defaultValue, clearBtn: defaultValue !== '' })
    }
  }

  searchHandler () {
    this.props.onSearch(this.state.value)
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
          value={this.state.value}
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
