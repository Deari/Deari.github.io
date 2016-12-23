import React from 'react'
import './index.scss'

class Tags extends React.Component {
  state = {
      checkedTag: []
  };

  selectTag(item) {
    item.checked = !item.checked;
    this.forceUpdate();
    if (item.checked) {
      this.state.checkedTag.push(item);      
    }else{
      this.state.checkedTag.pop(item);
    }
    this.props.onChecked(this.state.checkedTag)
  }
  render() {
    const { data: tags } = this.props
    return (
      <div>
        <ul className="tags-container">
          {
            tags.map((item, index) => {
              return <li key={item.tagId}
                className={item.checked ? 'active' : ''}
                onClick={this.selectTag.bind(this, item)}>{item.tagName}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default Tags;