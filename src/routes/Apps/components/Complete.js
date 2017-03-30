import './complete.scss'

const Complete = (props)=>(
  <div className="step-finish">
    <div className="finish-btn">
      <a href="/apps/list"><i className="iconfont icon-radio"></i>已提交审核</a>
    </div>
    <div className="finish-text-box">
      <p className="finish-return">返回<a>我的应用</a>，关注审核状态</p>
      <p className="finish-text">审核大概需要1周时间,请耐心等待,审核完成后,会以邮件的形式告知您,请您关注登录平台时的邮箱。</p>
      <p className="finish-text">或者您可以通过发送邮件,到bo@wanda.com.cn查询审核结果。</p>
    </div>
  </div>
)

export default Complete