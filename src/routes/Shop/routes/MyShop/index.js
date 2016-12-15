import React from 'react'
import { IndexLink, Link } from 'react-router'

class MyShop extends React.Component {
  render() {
    return <div>这是我的店铺<Link to="/shop/edit">edit</Link></div>
  }
}

export default MyShop;
