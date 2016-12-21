import React from 'react'
import { Link } from 'react-router'
import './Tab.scss'

class Tab extends React.Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0,
    };
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
  // componentWillReceiveProps(nextProps) {
  //   var len = nextProps.children.length;
  //   if (nextProps.isSubmitted) this.clickNext(len);
  // }
  clickTabBtn(index) {
    this.setState({ currentIndex: index });
  }
  async clickNext(len) {
    let result = await this.props.onClickNext();
    let linkUrl = this.props.linkUrl;
    console.log(result); 
    if (result.status !== 200) {
      window.alert(result.msg);
    } else {
      if (this.state.currentIndex !== len-1) {
        this.setState({currentIndex: this.state.currentIndex + 1});
      } else {
        location.href = location.origin + linkUrl;
      }
    }
  }
  clickPrev(len) {
    if (this.state.currentIndex !== 0) {
      this.setState({currentIndex: this.state.currentIndex - 1});
    }
  }
  getBtnName() {
    let btnInfo = this.props.btnInfo,
       currentIndex = this.state.currentIndex,
       len = this.props.children.length,
       btnName = {
        preName: "上一步",
        nextName: "下一步"
      };
    if (btnInfo && btnInfo.length > 0) {
      for (var i=0; i<btnInfo.length; i++) {
        if (btnInfo[i].step === (currentIndex + 1)) {
          btnName.preName = btnInfo[i].preName ? btnInfo[i].preName : "上一步";
          btnName.nextName = btnInfo[i].nextName ? btnInfo[i].nextName : "下一步";
        }
      }
    } else {
      if((len - 1) === currentIndex) {
        btnName.nextName = "提交审核";
      }
    }
    return btnName;
  }
  render() {
    var len = this.props.children.length,
        currentIndex = this.state.currentIndex,
        linkUrl = this.props.linkUrl;
    return (
      <div>
        <div className="bg-gray">
        <ul className="tab-container clx">
        {
          React.Children.map(this.props.children, (item, index) => {
            return (
              <li className={this.tabIndex(index)}
                  style={{cursor: this.showCursor(index)}}
                  onClick={(index < currentIndex) ? 
                            this.clickTabBtn.bind(this, index) : ''}>
                <div className="tabc-oneprogress">{index + 1}</div>
                {item.props.name}
              </li>
            )
          })  
        }
        </ul>
        </div>
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
        <div className="btn-container col-md-12">
          {
            currentIndex > 0 
              ? React.createElement( "div", {className: "btn-width"}, 
                  React.createElement( "button", 
                    {className: "btn btn-secondary", type: "button", onClick: this.clickPrev.bind(this, len)}, 
                    this.getBtnName(this).preName ) ) 
              : ''
          }
          {
            currentIndex < len 
              ? React.createElement( "div", {className: "btn-width"}, 
                  React.createElement( "button", {className: "btn btn-primary", type: "button", onClick: this.clickNext.bind(this, len)}, 
                  this.getBtnName(this).nextName ))
              : ''
          }
        </div>
      </div>
    )
  }
}
// (linkUrl && (currentIndex === (len-1))) 
//                       ? React.createElement( "a", {href: isSubmitted ? linkUrl : '/developer', className: "link-btn-a"}, this.getBtnName(this).nextName ) 
//                       : this.getBtnName(this).nextName )) 
export default Tab;