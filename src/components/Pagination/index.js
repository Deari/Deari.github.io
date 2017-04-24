import React, { Component } from 'react'
import s from './index.scss'
import cx from 'classnames'

class Pagination extends Component {
  state = {
    current: 6
  }

  static defaultProps = {
    currentPage: 1,
    total: 100,
    defaultPageSize: 10,
    pageSize: 10,
    showPageSize: 5,
    onChange: (page, pageSize)=>{
      console.log(page, pageSize)
    }
  }

  onChange(page) {
    this.setState({ current: page })
    this.props.onChange();
  }

  prevPage () {
    this.togglePage(this.state.current-1)
  }

  nextPage () {
    this.togglePage(this.state.current+1)
  }

  togglePage (page) {
    let _page = Math.max(page, 1)
    _page = Math.min(page, this.pageCount)

    this.setState({
      current: _page
    })
  }

  componentDidMount() {
    // this.onChange(this.props.current)
  }

  render () {
    const { current } = this.state
    const { total, defaultPageSize, showPageSize } = this.props
    const pageCount = Math.ceil(total/defaultPageSize)
    const pageList = []
    let i = 0;
    let pageElem;
    this.pageCount = pageCount;

    if (pageCount <= showPageSize) {
      for (i = 1; i <= pageCount; i++) {
        pageElem = <li 
          onClick={this.togglePage.bind(this,i)}  
          className={cx({ 'active': i === current })}>{i}</li>
        pageList.push(pageElem)
      }
    } else {
      if (current < 5) {
        for (i = 1; i <= current; i++) {
          pageElem = <li onClick={this.togglePage.bind(this,i)} 
            className={cx({ 'active': i === current })}>{i}</li>
          pageList.push(pageElem)
        }
      } else {
        pageList.push(<li onClick={this.togglePage.bind(this,i)}  >{1}</li>)
        pageList.push(<li onClick={this.togglePage.bind(this, i-5) } >...</li>)

        for (i = current - 2; i <= current; i++) {
          pageElem = <li onClick={this.togglePage.bind(this,i)}  
            className={cx({ 'active': i === current })}>{i}</li>
          pageList.push(pageElem)
        }
      }

      if (current >= pageCount - 3) {
        for (i = current + 1; i <= pageCount; i++) {
          pageElem = <li onClick={this.togglePage.bind(this,i)} >{i}</li>
          pageList.push(pageElem)
        }
      } else {
        for (i = current + 1; i <= current + 2; i++) {
          pageElem = <li onClick={this.togglePage.bind(this,i)} >{i}</li>
          pageList.push(pageElem)
        }
        pageList.push(<li onClick={this.togglePage.bind(this, i+5) }>...</li>)
        pageList.push(<li onClick={this.togglePage.bind(this, pageCount) }>{pageCount}</li>)
      }
    }

    return (
      <ul className='ff-pagination'>
        { current > 1 ? <li className='ff-pagination-prev' onClick={::this.prevPage}>上一页 </li> : null }
        
        {pageList}

        { current < pageCount ? <li className='ff-pagination-next' onClick={::this.nextPage}> 下一页 </li> : null }
      </ul>
    )

  }
}

export default Pagination