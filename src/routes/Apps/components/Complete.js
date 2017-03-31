import './complete.scss'
import { Link } from 'react-router'
const Complete = (props)=>(
  <div className="step-finish1">
    <div className="finish-btn">
      <p><i className="iconfont icon-finish"></i><span>成功创建应用</span></p>
    </div>
    <div className="finish-text-box">
      <p>审核大概需要1周时间,请耐心等待,审核完成后,会以邮件的形式告知您,请您关注登录平台时的邮箱。或者您可以通过发送邮件,到bo@wanda.com.cn查询审核结果。</p>
      <p>返回我的应用，关注审核状态。</p>
      <Link to="/apps/list" className="finish-return">查看我的应用</Link>
    </div>
  </div>
)

export default Complete