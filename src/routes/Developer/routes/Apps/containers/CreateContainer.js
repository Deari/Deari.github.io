import React, {Component} from 'react'
//import { createStore, combineReducers} from 'redux'
//import {connect} from 'react-redux'
//import { reducer as formReducer } from 'redux-form'
import Create from '../components/create'


//const reducers = {
  // ... your other reducers here ...
  //form: formReducer     // <---- Mounted at 'form'
//}


//const reducer = combineReducers(reducers)
//const store = createStore(reducer)

//const mapDispatchToProps = {
//  form: formReducer,
//  handleSubmit: () => {}
//}

//export default connect(undefined, mapDispatchToProps)(Create)


export default class CreateContainer extends React.Component {

  handleSubmit = (values) => {
    // Do something with the form values
    console.log(values);
  }

  render() {
    return (
      <div>
        <Create onSubmit={this.handleSubmit} />
      </div>
    );
  }
}
