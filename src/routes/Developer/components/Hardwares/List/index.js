import React from 'react'
import { Link } from 'react-router'
import fetchUtil from '../../../../utils/fetchUtil'

class HardwaresList extends React.Component {
  constructor() {
    super();
    this.state = {
      listData: [],
      status: 'published'
    }
  }
  async getList() {
    const apiUrl = `http://api.intra.sit.ffan.net/bo/v1/web/hardware/${this.state.status}`;
    try {
      const res = await fetchUtil.getJSON(apiUrl);
      if(res.status === 200){
        return res.data && res.data.list && res.data.list
      } else {
        console.log("res ", res);
      }
    } catch (e) {
      console.log(e)
    }
  }
  componentDidMount() {
    this.getList().then(
      response => {
        response && this.setState({listData: response})
      }
    )
  }
  changeList(value) {
    if (value === this.state.status) return;
    this.setState({status: value}, () => {
      this.getList().then(
        response => {
          response && this.setState({listData: response})
        }
      )
    });
  }
  render() {
    let status = this.state.status;
    return (
      <div className="cContent clx">
        <div className="col-sm-2 col-md-2 navThird">
          <ul>
            <li className={status === 'published' ? 'navThirdHover' : ''}
                onClick={this.changeList.bind(this, 'published')}>已经发布产品</li>
            <li className={status === 'unpublished' ? 'navThirdHover' : ''}
                onClick={this.changeList.bind(this, 'unpublished')}>未发布产品</li>
          </ul>
        </div>
        <div className="col-sm-10 col-md-10">
          <div className="ccContent">
            <Link className="ccContentBtn" to='/developer/hardware/create'>
              <div className="width110 float-right">
                <button className="btn btn-primary">+ 创建硬件</button>
              </div>
            </Link>
            <div className="">
              <ul>
                <li>
                  <a href="javascript:;">
                    产品名称： name
                    <img src="" alt="LOGO" />
                    产品PID： PID
                    创建时间： createTime
                    更新时间： updateTime
                  </a>
                  {status === 'unpublished' ? <Link to='/developer/hardware/edit/1'><button className="btn">继续</button></Link> : ''}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HardwaresList;