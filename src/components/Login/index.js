import React, { Component, PropTypes } from 'react'

export default class Login extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
  };

  static defaultProps = {
    authenticated: false
  };

  constructor (props) {
    super(props);
    this.state = {
      isLogin : props.authenticated
    }
  }

  registerHandle = ()=>{
    alert('show register modal');
  }

  loginHandle = ()=>{
    alert('show login modal');
  } 

  render (){
    return this.state.isLogin ? (
      <div className="logined">
        <div className="nav navbar-nav navbar-right">
          <span><img src="../../Home/Duck.jpg" /></span> | 
          <span>退出</span>
        </div>
      </div>
    ) : (
      <div className="loginIn">
        <div className="nav navbar-nav navbar-right">
          <span onClick={this.registerHandle}>立即注册</span> | 
          <span onClick={this.loginHandle}>使用帮助</span>
        </div>
      </div>
    )
  }
}
