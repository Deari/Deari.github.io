import React from 'react'
import { Link } from 'react-router'
import './index.scss'
import '../../styles/button.scss'

class List extends React.Component {
  render() {
    var data = this.props.data;
    return (
      <div>
        {
          data.map( (item, index) => (
            <div key={index} className="list-container">
              <div className="col-md-8 no-padding-left">
                <div className="info-img-container">
                  <div className="img-container">
                    <img src={item.url} className="img-thumbnail" />
                  </div>
                </div>
                <div className="info-content">
                  <div className="info-name" title={item.name}>{item.name}</div>
                  <div className="info-name" title={item.state}>{item.state}</div>
                </div>
              </div>
              <div className="col-md-2">{item.state}</div>
              <div className="col-md-2">
                <Link to='/counter'>
                  <button className="btn border-btn-black">管理</button>
                </Link>
              </div>
            </div>  
          ) )
        }
      </div>
    )
  }
}

export default List;