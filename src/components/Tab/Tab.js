import React from 'react'
import { Link } from 'react-router'
import './Tab.scss'

class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    var len = nextProps.children.length;
    if (nextProps.isSubmitted) this.clickNext(len);
  }
  tabIndex(index) {
    return this.state.currentIndex === index ? 'active' : '';
  }
  showCursor(index) {
    return this.state.currentIndex > index ? 'pointer' : 'default';
  }
  isCurrentIndex(index) {
    return this.state.currentIndex === index ? 'block' : 'none';
  }
  clickTabBtn(index) {
    this.setState({ currentIndex: index });
  }
  clickNext(len) {
    if (this.state.currentIndex !== len-1) {
      this.setState({currentIndex: this.state.currentIndex + 1});
    }
  }
  clickPrev(len) {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }
  }
  render() {
    var len = this.props.children.length,
        isSubmitted = this.props.isSubmitted,
        linkUrl = this.props.linkUrl;
    return (
      <div className="container">
        <ul className="tab-container">
        {
          React.Children.map(this.props.children, (item, index) => {
            return (
              <li className={this.tabIndex(index)}
                  style={{cursor: this.showCursor(index)}}
                  onClick={(index < this.state.currentIndex) ? 
                            this.clickTabBtn.bind(this, index) : ''}>
                <div className="tabc-oneprogress">{index + 1}</div>
                {item.props.name}
              </li>
            )
          })  
        }
        </ul>
        {
          React.Children.map(this.props.children, (item, index) => {
            return (
              <div style={{display: this.isCurrentIndex(index)}}>
                {item.props.children}
              </div>
            )
          })
        }
        <hr />
        <div className="container">
          <div className="btn-container">
          {
            this.state.currentIndex < len-2 ? React.createElement("button", 
            {className: "btn btn-primary", type: "button", onClick: this.clickNext.bind(this, len)}, 
            "下一步") : ''
          }
          {
            this.state.currentIndex > 0 ? React.createElement("button", 
            {className: "btn btn-secondary", type: "button", onClick: this.clickPrev.bind(this, len)}, 
            "上一步") : ''
          }
          {
            this.state.currentIndex === len-2 ? React.createElement("button", 
            {className: "btn btn-primary", type: "submit"}, 
            "提交审核") : ''
          }
          <Link to={linkUrl}>
          {
            this.state.currentIndex === len-1 ? React.createElement("button", 
              {className: "btn btn-primary", type: "button"}, "完成") : ''
          }
          </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Tab;