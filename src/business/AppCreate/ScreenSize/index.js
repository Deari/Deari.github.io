import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

class ScreenSize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: props.input.value,
      list: [{
        id: 'mobile',
        classname: 'img-small',
        text: '手机端',
        value: 1
      }, {
        id: 'pad',
        classname: 'img-middle',
        text: 'Pad端',
        value: 2
      }, {
        id: 'pc',
        classname: 'img-large',
        text: 'PC端',
        value: 4
      }]
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({ current: newProps.input.value })
  }

  handleChange (e) {
    const v = e.target.value;
    this.setState({
      current: v
    }, ()=>{
      this.props.input.onChange(v)
    })
  }

  render () {
    const props = this.props;
    const { meta: { touched, dirty, error, warning } } = props;
    const { list, current } = this.state;

    return (
      <div className="form-group">
        <label className='label'>{props.label}</label>
        <div className='form-item'>
          <div className="item-wrapper">
            {/*<h3 className={s.title}>请选择要适配的屏幕尺寸</h3>*/}
            <ul className={s.list}>
              {
                list.map(v=>{
                  return <li className={s.item}>
                    <label htmlFor={v.id} className={cx(s.img, s[v.classname])}></label>
                    <div className={s['size-text']}>
                      <span className={s.screen}>{v.text}</span>
                      {/*<span className={s.advice}>手机 (建议5英寸)</span>*/}
                    </div>
                    <div className={`row-radio ${s.radioBtn}`}>
                      <input type="radio" name="screenSize" 
                        checked={v.value == current} 
                        onChange={::this.handleChange} 
                        value={v.value} 
                        id={v.id} 
                        className={`input-radio`}
                      />
                      <span className="radio-item">
                        <i className="iconfont icon-radio"></i>
                        <i className="iconfont icon-radio1"></i>
                      </span>
                    </div>
                  </li>
                })
              }
            </ul>
          </div>
          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
        </div>
      </div>
    )
  }
}

export default ScreenSize;