import React from 'react'
import './index.scss'

class Tags extends React.Component {
  constructor() {
    super();
    this.state = {
      tags: []
    };
  }
  componentDidMount() {
    this.setState({tags: this.props.data});
  }
  selectTag(item) {
    var tags = this.state.tags;
    for (var i=0; i<tags.length; i++) {
      if (tags[i].id === item.id) {
        tags[i].checked = tags[i].checked ? false : true;
      } else {
        tags[i].checked = tags[i].checked ? true : false;
      }
    }
    this.setState({tags: tags});
  }
  render() {
    return (
      <div>
        <ul className="tags-container">
        {
          this.state.tags.map((item, index) => {
            return <li key={item.id} 
                       className={item.checked ? 'active' : ''}
                       onClick={this.selectTag.bind(this, item)}>{item.name}</li>
          })
        }
        </ul>
      </div>
    )
  }
}

export default Tags;