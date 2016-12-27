import React, { Component, PropTypes } from 'react'
import './login.scss'

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
      <div className="login-wrapper loginIn">
          <span onClick={this.registerHandle}>注册</span> 
          <span onClick={this.loginHandle}>登录</span>
      </div>
    ) : (
      <div className="login-wrapper logined">
          <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png" />
          <span>退出</span>
      </div>
    )
  }
}
