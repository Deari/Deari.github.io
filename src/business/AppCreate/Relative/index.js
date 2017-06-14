import React from 'react'
import s from '../Basic-new.scss'
import t from './index-new.scss'
import cx from 'classnames'
import Modal from 'components/Modal'
import AppsTable from './AppsTable'
import Tips from '../Tips'

class Relative extends React.Component {
    constructor(props) {
    super(props)
    const value = props.input.value || {
      apps: [],
      widgets: []
    };
    this.state = {
      value,
      list: {
        apps: {
          id: 'apps',
          text: '应用',
          unfold: !!value['apps'].length,
          modal: false,
        },
        widgets: {
          id: 'widgets',
          text: '组件',
          unfold: !!value['widgets'].length,
          modal: false
        }
      }
    }
  }

  componentWillReceiveProps (newProps) {
    const value = newProps.input.value || {};
    const { apps, widgets } = this.state.list;
    const list = {
      apps: {
        ...apps,
        unfold: !!value.apps.length
      },
      widgets: {
        ...widgets,
        unfold: !!value.widgets.length
      }
    }
    
    this.setState({ 
      value,
      list
    })
  }

  handleUnfold(type) {
    this.setState({
      list: {
        ...this.state.list,
        [type]: {
          ...this.state.list[type],
          unfold: !this.state.list[type].unfold 
        }
      }
    })
  }

  handleSelect(type) {
    this.setState({
      list: {
        ...this.state.list,
        [type]: {
          ...this.state.list[type],
          modal: true
        }
      }
    })
  }

  closeModal(type) {
    this.setState({
      list: {
        ...this.state.list,
        [type]: {
          ...this.state.list[type],
          modal: false
        }
      }
    })
  }

  onChange() {
    const {value, list} = this.state;
    const { apps, widgets } = value;

    const v = {
      apps: list.apps.unfold ? apps : [],
      widgets: list.widgets.unfold ? widgets : []
    }
    this.props.input.onChange(v)
  }

  add(type, data) {
    const { value } = this.state;
    this.setState({
      value: {
        ...value,
        [type]: value[type].concat([data])
      }
    }, ()=>{
      this.onChange()
    })
  }

  del(type, data){
    const { value } = this.state;
    this.setState({
      value: {
        ...value,
        [type]: value[type].filter(v => v.appId != data.appId)
      }
    }, ()=>{
      this.onChange()
    })
  }

  render () {
    const { appId, required, description, meta: { touched, dirty, error, warning } } = this.props;
    const { list, value } = this.state;
    const selected = value;

    return (
      <div className="form-group">
        <label className={ cx("label", { "required": required })}>配套使用</label>
        <div className="form-item">
          <div className="item-wrapper">
            <div className={s.info}>
              <p className={s.text}>
                应用在创建的配套使用的组件、硬件、应用后，
                只有当它们全部是已发布状态，才会显示在市场中展示。
                <br/>应用市场详情页的显示，如下图：
              </p>
              <div>
                <img src="http://open.ffan.net/bf2a12dbd3de591e34788366d7085dc0.png"
                  className={t.exampleImage}/>
                { description && <Tips content={description}></Tips> }
              </div>
            </div>
            
            <div className={s.checkboxList}>
              {Object.values(list).map(v=>(
              <div key={v.id} className={s.item}>
                <div className="checkbox-wrapper">
                  <div className="checkbox-item" onClick={()=>this.handleUnfold(v.id)} >
                    <i className={cx("iconfont", { 
                      "icon-radio": v.unfold,
                      "icon-radio1": !v.unfold
                    })}></i>
                    <span className={s['text-con']} >{v.text}</span>
                  </div>
                </div>

                <ul className={cx(s['relative-list'], { [s.active]: v.unfold })}>
                  {value[v.id] && value[v.id].map(item => {
                    return <li key={item.id} className={s.item}>
                      <img src={item.appLogo} className={s.img}/>
                      <i className={`iconfont icon-del ${s.delBtn}`}
                        onClick={()=>this.del(v.id, item)}></i>
                      <span className={s.name}>{item.appName}</span>
                    </li>
                  })}
                  <div className={cx(s.item, s.addBtn)} onClick={()=>this.handleSelect(v.id) } >
                    <span className={s.add}><i className="iconfont icon-add"></i>选择</span>
                  </div>
                </ul>
              </div>))}
            </div>

            <Modal
              title={`选择应用`}
              active={list.apps.modal} 
              onClose={this.closeModal.bind(this, 'apps')}>
              <AppsTable type={'apps'} selected={selected['apps']}
                appId={appId}
                add={this.add.bind(this, 'apps')}
                del={this.del.bind(this, 'apps')}
                ></AppsTable>
            </Modal>

            <Modal
              title={`选择组件`}
              active={list.widgets.modal} 
              onClose={this.closeModal.bind(this, 'widgets')}>
              <AppsTable type={'widgets'} selected={selected['widgets']}
                appId={appId}
                add={this.add.bind(this, 'widgets')}
                del={this.del.bind(this, 'widgets')}
                ></AppsTable>
            </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default Relative;