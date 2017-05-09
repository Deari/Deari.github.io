import s from './DevInfo-new.scss'
const DevInfo = (props) => {
  return <div className={s.content}>
    <h2 className={s.title}>查看developkey</h2>
    <div>
      <h2>开发密钥</h2>
      <ul>
        <li>developkey: 199023</li>
        <li>developSecret: sdsdsdsds</li>
      </ul>
    </div>
  </div>
}

export default {
  path: 'devinfo',
  component: DevInfo
}
