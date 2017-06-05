import React from 'react'
import s from './index-new.scss'
import cx from 'classnames'

class PhoneSize extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      current: {
        w: 4,
        h: 2
      },
      list: [{
        id: '4_2',
        classname: 'img-one',
        value: {
          w: 4,
          h: 2
        }
      }, {
        id: '1_1',
        classname: 'img-two',
        value: {
          w: 1,
          h: 1
        }
      }, {
        id: '4_4',
        classname: 'img-three',
        value: {
          w: 4,
          h: 4
        }
      }, {
        id: '4_1',
        classname: 'img-four',
        value: {
          w: 4,
          h: 1
        }
      }]
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({ current: newProps.input.value })
  }

  handClick({ value }) {
    this.setState({
      current: value
    }, ()=>{
      this.props.input.onChange(value)
    })
  }

  render() {
    const { meta: { touched, dirty, error, warning }, isEditMode } = this.props;
    const { list, current } = this.state;

    return (
      <div className="form-group">
        <label className='label'>尺寸</label>
        <div className='form-item'>
          <div className="item-wrapper">
            <h3 className={s.title}>组件在手机屏幕中所占比例的尺寸</h3>
            <ul className={s.list}>
              { !isEditMode && list.map(v=><li key={v.id} className={s.item} onClick={()=>this.handClick(v)}>
                <div className={`${s.img} ${s[v.classname]}`}></div>
                <span className={s['size-text']}>{v.value.w}*{v.value.h}</span>
                <div className={`checkbox-wrapper`}>
                  <span className="checkbox-item">
                    { current.w == v.value.w && current.h == v.value.h ? <i className="iconfont icon-radio active"></i> :
                    <i className="iconfont icon-radio1 active"></i> }
                  </span>
                </div>
              </li>)}

              { isEditMode && list.map(v=>{
                if(current.w == v.value.w && current.h == v.value.h) {
                  return <li key={v.id} className={s.item} >
                    <div className={`${s.img} ${s[v.classname]}`}></div>
                    <span className={s['size-text']}>{v.value.w}*{v.value.h}</span>
                  </li>
                }
              })}
            </ul>
          </div>
          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
        </div>
      </div>
    )
  }
}

export default PhoneSize;