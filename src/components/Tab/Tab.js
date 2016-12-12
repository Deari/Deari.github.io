import React from 'react';
import './Tab.scss';

class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }
  tabIndex(index) {
    return this.state.currentIndex === index ? 'active' : '';
  }
  isCurrentIndex(index) {
    return this.state.currentIndex === index ? 'block' : 'none';
  }
  render() {
    return (
      <div className="container">
        <ul className="tab-container">
        {
          React.Children.map(this.props.children, (item, index) => {
            return (
              <li className={"col-sm-4 " + this.tabIndex(index)}>
                <div>{index + 1}</div>
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
        <div className="btn-container">
          <button className="btn btn-primary">按钮一</button>
          <button className="btn btn-primary">按钮二</button>
        </div>
      </div>
    )
  }
}

export default Tab;