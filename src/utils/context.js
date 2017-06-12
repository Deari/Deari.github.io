import React from 'react'

export const withContext = (childContextTypes, getChildContext) => (Component) => {
  class ContextProvider extends React.Component {
    static childContextTypes = childContextTypes;
    getChildContext () {
      return getChildContext()
    }
    render(){
      return <Component {...this.props} />
    }
  }
  return ContextProvider
}

export const getContext = (contextTypes) => (Component) => {
  const ContextConsumer = (props, context) => <Component {...props} {...context}/>;
  ContextConsumer.contextTypes = contextTypes;
  return ContextConsumer
}