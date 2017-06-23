import React from 'react'
import s from './AppInfo-new.scss'
import fetchUtil from 'utils/fetch'
import { getDomain } from 'utils/d'

class AppInfo extends React.Component {
  state = {
    developerKey: 'loading...',
    developerSecret: 'loading...'
  }

  componentDidMount () {
    fetchUtil.getJSON(getDomain('/app/v1/bo/v1/web/devDataById/self')).then(data => {
      this.setState({
        ...data
      })
    }).catch(e => {
      alert(JSON.stringify(e))
    })
  }

  render () {
    const { developerKey, developerSecret } = this.state
    return (
        <div className={s.devInfo}>
          <h2 className={s.title}>开发密钥</h2>
          <div className={s.main}>
            <label htmlFor='' className={s.name}>DeveloperKey：</label>
            <span className={s.text}>{developerKey}</span>
          </div>
          <div className={s.main}>
            <label htmlFor='' className={s.name}>DeveloperSecret: </label>
            <span className={s.text}>{developerSecret}</span>
          </div>
        </div>
    )
  }
}

export default AppInfo
