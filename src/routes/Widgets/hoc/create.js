import React from 'react'
import { fetchTags } from 'reducers/api'

const BasicFormHOC = (Wrapper) => class Container extends React.Component {
  state ={
    tags: []
  }

  componentDidMount() {
    fetchTags().then(data=>{
      this.setState({
        tags: data
      })
    })
  }

  render() {
    const newProps = {
      tagSource: this.state.tags
    }
    
    return <Wrapper {...this.props} {...newProps}></Wrapper>
  }
}

export default BasicFormHOC