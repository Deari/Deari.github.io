import './step.scss'
import { Link } from 'react-router'
const Step = (props)=>(
  <div className="step">
  	<p className="step-smallnav">
    <Link className="iconfont icon-fanhui" to='/widgets/list'></Link>
    <span>我的组件</span>
    <span className="step-smallnav-arrow">/</span>
    {props.title && props.title || '创建新组件'} {props.appKindName || ''}
    </p>
  </div>
)
export default Step