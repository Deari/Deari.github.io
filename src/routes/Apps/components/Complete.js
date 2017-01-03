import './complete.scss'

const Complete = (props)=>(
  <div className="step-finish">
    <i className="iconfont icon-finish"></i>
    <span>提交成功，等待审核</span>
    <div className="form-btn">
      <a href="/apps/list">
        <button>完成</button>
      </a>
    </div>
  </div>
)

export default Complete;