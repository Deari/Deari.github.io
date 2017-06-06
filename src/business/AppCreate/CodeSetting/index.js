import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import s from './index-new.scss'

const Single = ({ id, label, value, desc, onChange}) => {
  return ( 
    <div className={s.inputsBox}>
      <input name='id' type="text" placeholder="唯一ID" value={id} 
        onChange={onChange}/>
      <input name='label' type="text" placeholder="字段名称" value={label}
        onChange={onChange}/>
      <input name='value' type="text" placeholder="字段值" value={value}
        onChange={onChange}/>
      <input name='desc' type="text" placeholder="字段描述" value={desc}
        onChange={onChange}/>
    </div>
  )
}

class Multiple extends Component {
  
  handleChange(index, e) {
    const { valueList } = this.props;
    const newV = valueList.map((v, k) => {
      if(index == k) {
        return {
          ...v,
          [e.target.name]: e.target.value && e.target.value.trim()
        }
      }
      return v
    })
    this.props.onChange('valueList', newV)
  }

  del(index) {
    const { valueList } = this.props;
    this.props.onChange('valueList', valueList.filter((v, k) => k != index))
  }
  add(index) {
    this.props.onChange('valueList', this.props.valueList.concat([ {} ]))
  }

  render () {
    const { id, valueList, onChange } = this.props;

    return (
      <div className={s.inputsBox}>
        <input type="text" name='id' placeholder="唯一ID" value={id} onChange={(e)=>{
          onChange('id', e.target.value && e.target.value.trim())
        }}/>
        <div className={s.inputsList}>
          {
            valueList.map((v, k) => {
              return <div key={k} className={s.inputsItem}>
                <div className={s.inputsWrapper}>
                  <input type="text" name='label' placeholder="字段名称" value={v.label}
                    onChange={this.handleChange.bind(this, k)}/>
                  <input type="text" name='value' placeholder="字段值" value={v.value}
                    onChange={this.handleChange.bind(this, k)}/>
                  <input type="text" name='desc' placeholder="字段描述" value={v.desc}
                    onChange={this.handleChange.bind(this, k)}/>
                </div>
                <span className={s.del}>
                  <i className='iconfont icon-del1' onClick={this.del.bind(this, k)}></i>
                </span>
              </div>
            })
          }
        </div>
        <div className={s.addBtn} onClick={this.add.bind(this)}>
          <i className='iconfont icon-fileadd'></i>
          添加新选项
        </div>
      </div>
    )
  }
}

class CodeSetting extends Component {
  constructor(props) {
    super(props);
    const value = JSON.parse(props.input.value);
    this.state = {
      value: Array.isArray(value) ? value : [
        // {
        //   __uuid: 'xx',
        //   id: '',
        //   label: '',
        //   type: 'input',
        //   value: '',
        //   valueList: [],
        //   enableEdit: true,
        //   desc: ''
        // }
      ]
    }
  }
  componentWillReceiveProps(newProps) {
    const value = JSON.parse(newProps.input.value);
    
    this.setState({
      value: Array.isArray(value) ? value : [] 
    })
  }

  onChange() {
    const { value } = this.state;
    this.props.input.onChange(JSON.stringify(value))
  }

  handleAddNew () {
    this.setState({ value: this.state.value.concat([{
      id: '',
      label: '',
      type: 'input',
      value: '',
      valueList: [],
      enableEdit: true,
      desc: ''
    }])}, ()=>{
      this.onChange()
    })
  }

  handleDelete(index) {
    const value = this.state.value.filter((item, key) => {
      return key != index
    })
    this.setState({ value }, ()=>{
      this.onChange()
    })
  }
  
  handleChange(index, e){
    const value = this.state.value.map((item, i) => {
      if(index == i) {
        return {
          ...this.state.value[index],
          [e.target.name]: e.target.value && e.target.value.trim()
        }
      }
      return item
    })

    this.setState({ value }, ()=>{
      this.onChange()
    })
  }

  handleRadioChange(index, key, value) {
    this.setState({ 
      value: this.state.value.map((item, i) => {
        if(i == index) {
          return {
            ...this.state.value[index],
            [key]: value
          }
        }
        return item
      })
    }, ()=>{
      this.onChange()
    })
  }

  handleTypeChange(index, e) {
    const value = this.state.value.map((item, i) => {
      if(index == i) {
        return {
          valueList: [],
          ...this.state.value[index],
          type: e.target.value
        }
      }
      return item
    })

    this.setState({ value }, ()=>{
      this.onChange()
    })
  }

  render () {
    const { value } = this.state;

    return (
      <div className="form-group">
        <label className="label">组件配置</label>
        <div className="form-item">
          <div className="item-wrapper">
            <div className={s.box}>
              <div className={s.group}>
                {Array.isArray(value) && value.map((v, k) => {
                  return <div className={s.item} key={k}>
                    <div className={s.selectBox}>
                      <select onChange={this.handleTypeChange.bind(this, k)}>
                        <option value="input" selected={v.type =='input'}>文本框</option>
                        <option value="radio" selected={v.type =='radio'}>单选框</option>
                      </select>
                    </div>
                    {
                      v.type == 'input' ? <Single {...v} onChange={this.handleChange.bind(this, k)} />
                        : <Multiple {...v} onChange={this.handleRadioChange.bind(this, k)} />
                    }
                    <span className={s.del}>
                      <i className='iconfont icon-close' onClick={this.handleDelete.bind(this, k)}></i>
                    </span>
                  </div>
                })}
              </div>
              <span className={s.addBtn} onClick={this.handleAddNew.bind(this)}>
                <i className='iconfont icon-fileadd'></i>
                填写属性值
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CodeSetting
