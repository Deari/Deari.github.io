import React, { Component, PropTypes } from 'react'
import Modal from 'components/Modal'

export class Test extends Component {

  state = {
    modalActive: true
  }

  onClose() {
    this.setState({
      modalActive: false
    })
  }

  render() {
    return <div>
      <Modal type={"confirm"} active={this.state.modalActive}
             onClose={::this.onClose}
             cancelBtnText={'取消'}>
        <p className="center">发布成功</p>
      </Modal>
    </div>
  }
}

export default store => ({
  path: 'demo',
  component: Test,
})
