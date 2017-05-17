import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

class ScreenSize extends React.Component {
  constructor(props) {
    super(props)
    const v = props.input.value || 1;
    this.state = {
      small: {
        value: 1,
        selected: v & 1,
      },
      middle: {
        value: 2,
        selected: v & 2
      },
      large: {
        value: 4,
        selected: v & 4
      }
    }
  }

  componentDidMount() {
    this.notify()
  }

  notify() {
    let val = 0;
    const s = this.state;
    for(let v in s) {
      if(s[v].selected) {
        val += s[v].value
      }
    }
    this.props.input.onChange(val)
  }

  handleChange (e) {
    const type = e.target.id;
    this.setState({
      [type]: {
        ...this.state[type],
        selected: e.target.checked
      }
    }, ()=>{
      this.notify()
    })
  }

  render () {
    const props = this.props;
    const { meta: { touched, dirty, error, warning } } = props;
    const { small, middle, large } = this.state;
    return (
      <div className="form-group">
        <label className='label'>{props.label}</label>
        <div className='form-item'>
          <div className="item-wrapper">
            <h3 className={s.title}>请选择要适配的屏幕尺寸</h3>
            <ul className={s.list}>
              <li className={s.item}>
                <label htmlFor="small" className={`${s.img} ${s['img-small']}`}></label>
                <div className={s['size-text']}>
                  <span className={s.screen}>小屏幕</span>
                  <span className={s.advice}>手机 (建议5英寸)</span>
                </div>
                <div className={`row-radio ${s.radioBtn}`}>
                  <input type="checkbox" checked={small.selected} onChange={::this.handleChange} value={small.value} id="small" className={`input-radio`}/>
                  <span className="radio-item">
                    <i className="iconfont icon-checkbox"></i>
                    <i className="iconfont icon-checkbox1"></i>
                  </span>
                </div>
              </li>
              <li className={s.item}>
                <label htmlFor="middle" className={`${s.img} ${s['img-middle']}`}></label>
                <div className={s['size-text']}>
                  <span className={s.screen}>中等屏幕</span>
                  <span className={s.advice}>平板 (建议8英寸)</span>
                </div>
                <div className={`row-radio ${s.radioBtn}`}>
                  <input type="checkbox" checked={middle.selected} onChange={::this.handleChange} value={middle.value} id="middle" className={`input-radio`}/>
                  <span className="radio-item">
                    <i className="iconfont icon-checkbox"></i>
                    <i className="iconfont icon-checkbox1"></i>
                  </span>
                </div>
              </li>
              <li className={s.item}>
                <label htmlFor="large" className={`${s.img} ${s['img-large']}`}></label>
                <div className={s['size-text']}>
                  <span className={s.screen}>大屏幕</span>
                  <span className={s.advice}>桌面 (≥1440px)</span>
                </div>
                <div className={`row-radio ${s.radioBtn}`}>
                  <input type="checkbox" checked={large.selected} onChange={::this.handleChange} value={large.value} id="large" className={`input-radio`}/>
                  <span className="radio-item">
                    <i className="iconfont icon-checkbox"></i>
                    <i className="iconfont icon-checkbox1"></i>
                  </span>
                </div>
              </li>
            </ul>
          </div>
          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
        </div>
      </div>
    )
  }
}

export default ScreenSize;