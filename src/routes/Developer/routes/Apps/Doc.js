import React from 'react'
import { IndexLink, Link } from 'react-router'
import '../../../../components/Header/Header'

class Doc extends React.Component {
  render() {
    return <div className="cContent">
      <div className="navThird">
        <ul>
          <li>
          介绍
          </li>
        </ul>
        <ul>
          <li>
          规范
          </li>
        </ul>
        <ul>
          <li>
          开发
            <ul>
              <li>接入指南
                <ul>
                  <li>Android接入指南</li>
                  <li>IOS接入指南</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="ccContent">
        hello 开发者文档
      </div>
    </div>
  }
}

export default Doc;