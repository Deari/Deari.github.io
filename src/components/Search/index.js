import React, { Component }from 'react'
import { findDOMNode } from 'react-dom'
import s from './index-new.scss'

class Search extends Component {
  state = {
    clearBtn: false
  }

  static defaultProps = {
    onSearch: ()=> {}
  };

  changeHandler (e) {
    if(e.target && e.target.value && e.target.value.trim()) {
      this.setState({ clearBtn: true })
    }
  }

  clear(){
    this.refs._input.value = ''
  }

  searchHandler () {
    const val = this.refs._input.value.trim()
    val && this.props.onSearch(val)
  }

  render () {
    const { placeholder, style, onSearch } = this.props
    const { clearBtn } = this.state

    return (
      <span style={{style}} className={s.searchWrap}>
        <i className='iconfont icon-search'
          onClick={::this.searchHandler}>
        </i>
        <input 
          className={s.input}
          type="text" 
          placeholder={placeholder} 
          ref='_input' 
          onChange={::this.changeHandler}
        />
        { clearBtn ? <i className="iconfont " 
          onClick={::this.clear}
          >&times;</i> : null
        }
      </span>
    )
  }
}

export default Search