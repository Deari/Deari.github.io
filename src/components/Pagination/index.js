import React, { Component } from 'react'
import s from './index.scss'
import cx from 'classnames'

class Pagination extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 1,
      pageSize: props.pageSize
    }
  }
  
  static defaultProps = {
    currentPage: 1,
    total: 200,
    pageSize: 10,
    showPageSize: 5,
    pageSizeOptions: [],
    enableGoto: false, 
    onChange: (page, pageSize)=>{
      console.log(page, pageSize)
    }
  }

  prevPage () {
    this.togglePage(this.state.current-1)
  }

  nextPage () {
    this.togglePage(this.state.current+1)
  }

  togglePage (page) {
    this.setState({
      current: Math.min(Math.max(page, 1), this.pageCount)
    }, ()=>{
      const { current, pageSize } = this.state;
      this.props.onChange(current, pageSize);
    })
  }

  onSelectPageSize (e) {
    console.log(e.target.value);
  }

  componentDidMount() {
    const current = this.props.current;
    current && this.setState({
      current
    })
  }

  render () {
    const { current } = this.state
    const { total, showPageSize, pageSizeOptions, pageSize, enableGoto } = this.props
    const pageCount = Math.ceil(total/pageSize)
    const pageList = []
    let i = 0;
    let pageElem;
    this.pageCount = pageCount;
    if(pageCount <= 1) {
      return null
    }

    if (pageCount <= showPageSize) {
      for (i = 1; i <= pageCount; i++) {
        pageElem = <li 
          onClick={this.togglePage.bind(this,i)}  
          className={cx({ 'active': i === current })}>{i}</li>
        pageList.push(pageElem)
      }
    } else {
      if (current < 5) {
        for (i = 1; i < current; i++) {
          pageElem = <li onClick={this.togglePage.bind(this,i)}>{i}</li>
          pageList.push(pageElem)
        }
      } else {
        pageList.push(<li onClick={this.togglePage.bind(this, 1)}>1</li>)
        pageList.push(<li onClick={this.togglePage.bind(this, current-5) } >...</li>)

        for (i = Math.min(current - 2, pageCount - 5); i < current; i++) {
          pageElem = <li onClick={this.togglePage.bind(this,i)}>{i}</li>
          pageList.push(pageElem)
        }
      }

      pageList.push(<li onClick={this.togglePage.bind(this, current)} className='active'>{current}</li>)

      if (current + 3 < pageCount) {
        for (i = current+1; i <= Math.max(current+2, 5); i++) {
          pageElem = <li onClick={this.togglePage.bind(this, i)} >{i}</li>
          pageList.push(pageElem)
        }
        pageList.push(<li onClick={this.togglePage.bind(this, current+5) }>...</li>)
      } else {
        for (i = current+1; i < pageCount; i++) {
          pageElem = <li onClick={this.togglePage.bind(this, i)} >{i}</li>
          pageList.push(pageElem)
        }
      }
      if(current < pageCount) {
        pageList.push(<li onClick={this.togglePage.bind(this, pageCount) }>{pageCount}</li>)
      }
    }

    return (
      <ul className='ff-pagination' style={this.props.style}>
        <li className={cx('prev-btn', { 'disabled': current <= 1 })} onClick={::this.prevPage}>上一页 </li>
        {pageList}
        <li className={cx('next-btn', { 'disabled': current >= pageCount })} onClick={::this.nextPage}> 下一页 </li>
        
        <div className='pagination-options'>
          { pageSizeOptions.length ? <div className='select-page'>
            <select onChange={::this.onSelectPageSize}>
              {pageSizeOptions.map((v,k) => <option key={k} value={v} 
                selected={+v===current} >{v}/页</option>)}
            </select>
          </div> : null }
          {enableGoto ? <div className='quick-jumper'>
            <label htmlFor="">Goto</label>
            <input type="text" ref='pageNum'/>
          </div> : null}
        </div>
      </ul>
    )

  }
}

export default Pagination