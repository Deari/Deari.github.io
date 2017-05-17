import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

class ScreenSize extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  handleChange (e) {
    console.log(e.target.id, e.target.checked)
  }

  render () {
    const props = this.props;
    const { meta: { touched, dirty, error, warning } } = props;

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
                  <input type="checkbox" onChange={::this.handleChange} value="1" id="small" className={`input-radio ${s.screenRadio}`}/>
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
                  <input type="checkbox" value="2" id="middle" className={`input-radio ${s.screenRadio}`}/>
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
                  <input type="checkbox" value="3" id="large" className={`input-radio ${s.screenRadio}`}/>
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