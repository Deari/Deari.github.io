import React, { Component } from 'react'
import './ProductCreator.scss'
import Board from './Board'
import { Accordion, Collapse } from 'components/Accordion'
import Messages from 'components/Message'
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

class Todo extends Component {
  render() {
    const items = this.props.items.map((item, i) => (
      <div key={item} onClick={() => this.props.handleRemove(i)}>
        {item}
      </div>
    ));

    return (
      <ReactCSSTransitionGroup
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {items}
      </ReactCSSTransitionGroup>
    );
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [ 'hello', 'world', 'click', 'me' ] };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({ items: newItems });
  }

  handleRemove(i) {
    let newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }

  render() {

    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <Todo items={this.state.items} handleRemove={::this.handleRemove}/>
      </div>
    );
  }
}

export class ProductCreator extends Component {

  constructor(props) {
    super(props)
    this._messages = new Messages()
    this.index = 0
  }

  onClick() {
    this._messages.add(<div>{`aaaaaaa${this.index++}`}</div>, 3000)
  }

  render() {
    const mess = new Messages()
    mess.add(<div style={{ background: "#87cefa" }}>First</div>, 2000)
    mess.add(<div style={{ background: "#79b9e1" }}>Second</div>, 3000)
    mess.add(<div style={{ background: "#6ca4c8" }}>First</div>, 4000)
    mess.add(<div style={{ background: "#e7f5fe" }}>Second</div>, 5000)
    mess.add(<div style={{ background: "#dbf0fd" }}>First</div>, 6000)
    mess.add(<div style={{ background: "#cfebfd" }}>Second</div>, 0)
    return <div>
      <Board knightPosition={[ 3, 5 ]}/>
      <TodoList/>
      <button onClick={::this.onClick}>Mess</button>
    </div>
  }
}

export default ProductCreator
