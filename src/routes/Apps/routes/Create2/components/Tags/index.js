import React from 'react'
import s from '../Basic-new.scss'
import t from './index-new.scss'
import cx from 'classnames'
import Tips from '../Tips'

class Tags extends React.Component {
  constructor (props) {
    super(props);

    const selected = {}
    
    if(Array.isArray(props.input.value)) {
      props.input.value.map(v => {
        selected[v] = true
      })
    }

    this.state={
      dataSource: props.dataSource,
      selected
    }
  }

  handleClick (tag) {
    const { dataSource, selected } = this.state;
    const _selected = {
      ...selected,
      [tag.tagId]: !selected[tag.tagId]
    }

    const newValues = dataSource.filter(v=> _selected[v.tagId])

    this.setState({ selected: _selected }, ()=>{
      this.props.input.onChange(newValues)
    })
  }

  render () {
    const { selected } = this.state;
    const props = this.props;
    const { description, meta: { touched, dirty, error, warning } } = props;

    return (
      <div className="form-group">
        <label className='label'>{props.label}</label>
        <div className='form-item'>
          <div className="item-wrapper">
            <ul className={t['item-tag']}>
              {props.dataSource.map((v) => {
                return <li className={cx(t.tags, {
                  [t.active]: selected[v.tagId]
                })} onClick={this.handleClick.bind(this, v)}>{v.tagName}</li>
              })}
            </ul>
            { description && <Tips content={description}></Tips> }
          </div>

          {(dirty || touched) && ((error && <div className="form-item-msg error">{error}</div>))}
        </div>
      </div>
    )
  }
}

export default Tags;