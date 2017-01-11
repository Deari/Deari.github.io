import React, {Component, PropTypes} from 'react'
import Modal from 'components/Modal'

export const Test = props => (
  <div>
    <Modal type={"confirm"} active={locationTips}
           cancelBtnText={'返回修改'}>
      <p>您参与的是
        如非本城市用户请返回定位自己所在城市，否则中奖后将无法门店自提。</p>
    </Modal>
  </div>
)

export default store => ({
  path: 'demo',
  component: Test,
})
