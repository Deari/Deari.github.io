import React, {Component} from 'react'

class Member extends Component {
  render() {
    return <div><h1>Member</h1></div>
  }
}

export default store => ({
  path: 'member',
  component: Member
})
