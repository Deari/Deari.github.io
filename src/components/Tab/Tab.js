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
  getBtnName() {
    let btnInfo = this.props.btnInfo;
    let currentIndex = this.state.currentIndex;
    let btnName = {
      preName: "上一步",
      nextName: "下一步"
    };
    for (var i=0; i<btnInfo.length; i++) {
      if (btnInfo[i].step === (currentIndex + 1)) {
        btnName.preName = btnInfo[i].preName ? btnInfo[i].preName : "上一步";
        btnName.nextName = btnInfo[i].nextName ? btnInfo[i].nextName : "下一步";
      }
    }
    return btnName;
  }
  render() {
    var len = this.props.children.length,
        currentIndex = this.state.currentIndex,
        isSubmitted = this.props.isSubmitted,
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
        <div className="btn-container btn btn-primary">
          {
            currentIndex > 0 ? React.createElement( "button", 
            {className: "btn btn-secondary", type: "button", onClick: this.clickPrev.bind(this, len)}, 
            this.getBtnName(this).preName ) : ''
          }
          {
            currentIndex < len ? React.createElement( "button", 
            {className: "btn btn-primary", type: "button", onClick: this.clickNext.bind(this, len)}, 
            this.getBtnName(this).nextName ) : ''
            }
        </div>
      </div>
    )
        // <div className="btn-container btn btn-primary">
        //   {
        //     this.state.currentIndex < len-2 ? React.createElement("button", 
        //     {className: "btn btn-primary", type: "button", onClick: this.clickNext.bind(this, len)}, 
        //     "下一步") : ''
        //   }
        //   {
        //     this.state.currentIndex > 0 ? React.createElement("button", 
        //     {className: "btn btn-secondary", type: "button", onClick: this.clickPrev.bind(this, len)}, 
        //     "上一步") : ''
        //   }
        //   {
        //     this.state.currentIndex === len-2 ? React.createElement("button", 
        //     {className: "btn btn-primary", type: "submit"}, 
        //     "提交审核") : ''
        //   }
        //   <Link to={linkUrl}>
        //   {
        //     this.state.currentIndex === len-1 ? React.createElement("button", 
        //       {className: "btn btn-primary", type: "button"}, "完成") : ''
        //   }
        //   </Link>
        // </div>
  }
}

export default Tab;