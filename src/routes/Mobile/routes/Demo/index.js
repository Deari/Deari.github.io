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

    onOpen() {
    this.setState({
      modalActive: true
    })
  }

  render() {
    return <div>
    <button onClick={::this.onOpen}>tanchuang</button>
      <Modal type={"confirm"} active={this.state.modalActive}
             onClose={::this.onClose}
             onCancel={::this.onClose}
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
