import React from 'react';
//import classnames from 'classnames';
import './css/item.scss';
import { IndexLink, Link } from 'react-router'

class Item extends React.Component {
  render() {
    const {item} = this.props;
    let btnClass = "btn";
    console.log(item.type)
    if(item.type){
      btnClass+="active"; 
    }
    return (
      <div>
        <div>{item.name}</div>
        <img src='' alt={item.name} />
        <div>{item.Pid}</div>
        <div>{item.createTime}</div>
        <div>{item.updateTime}</div>
        <Link className={btnClass} to='/developer/hardware/create' activeClassName='route--active'>
          继续
        </Link>
      </div>
    )
  }
}

export default Item
