import React from 'react'
import './index.scss'

class Tags extends React.Component {
  state = {
      tags: this.props.data,
      checkedTag: []
  };

  selectTag(item) {
    item.checked = true;
    this.state.checkedTag.push(item);
    this.forceUpdate();
    this.props.onChecked(this.state.checkedTag)
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