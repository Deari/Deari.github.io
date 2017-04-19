import React, { Component } from 'react'

class Pagination extends Component {
  state = {
    current: 1
  }

  static defaultProps = {
    currentPage: 1,
    total: 0,
    defaultPageSize: 10,
    pageSize: 10,
    onChange: (page, pageSize)=>{
      console.log(page, pageSize)
    }
  }

  onChange(page) {
    this.setState({ current: page })
    this.props.onChange();
  }

  componentDidMount() {
    this.onChange(this.props.current)
  }

  render () {
    const { current } = this.state
    const { total, defaultPageSize } = this.props
    const pageCount = Math.ceil(total/defaultPageSize)
    const pageList = []
    
    return (
      <ul>
        <li>首页</li>
        <li>上一页</li>
        {pageList}
        <li>下一页</li>
        <li>尾页</li>
      </ul>
    )

  }
}