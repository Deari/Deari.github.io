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
      <div>
        <span>已登录</span>
      </div>
    ) : (
      <div>
        <span onClick={this.registerHandle}>注册</span> | 
        <span onClick={this.loginHandle}>登陆</span>
      </div>
    )
  }
}
