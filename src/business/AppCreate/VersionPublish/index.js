import React from 'react'
import s from '../Basic-new.scss'

class VersionPublish extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: +props.input.value,
      list: [{
        id: 'hand',
        text: '手动发布此版本',
        value: 0
      }, {
        id: 'auto',
        text: '自动发布此版本',
        value: 1
      }]
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ current: +newProps.input.value })
  }
  
  handleChange(e) {
    const v = e.target.value;
    this.setState({
      current: v
    })
    this.props.input.onChange(+v)
  }

  render(){
    const { value } = this.props.input
    const { list, current } = this.state;
    return (
      <div className="form-group">
        <label className="label">版本发布</label>
        <div className="form-item">
          <div className="item-wrapper">
            <p className={s.text}>在您的应用获得批准后，我们可以立即为您发布它。如果您要自己发布该应用。请选择一个日期或者在批准后的任何时刻手动发布它。 当您的应用处于“等待开发人员发布”状态。您可以继续测试，或者拒绝发布并提交一个新的版本。无论您选择哪个选项，我们必须先 处理您的应用，然后才能在应用市场上提供它。当您的应用处于“审核中”状态，您无法拒绝您的应用。</p>
            {list.map(v=> (
              <div className={s['apply-radio']}>
                <div className="checked-wrapper">
                  <input onChange={::this.handleChange} checked={+current === v.value} type="radio" name="publishType" id={v.id} value={v.value} className="checked-input" />
                  <span className="checked-item">
                      <i className="iconfont icon-radio1 active"></i>
                      <i className="iconfont icon-radio"></i>
                  </span>
                </div>
                <label htmlFor={v.id} className={s['text-con']}>{v.text}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default VersionPublish;