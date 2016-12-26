import React from 'react'
import './index.scss'
const remove = function (arr, val) {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
};
class Tags extends React.Component {
  state = {
      checkedTag: this.props.checkedArr
  };

  selectTag(item) {
    const list = this.state.checkedTag
    item.checked = !item.checked;
    this.forceUpdate();
    if (item.checked) {
      list.push(item);
    } else {
      remove(list, item)
    }
    console.log(list)
    this.props.onChecked(list)
  }
  render() {
    const { data:tags} = this.props
    return (
        <ul className="tags-container">
          {
            tags.map((item, index) => {
              return <li key={item.tagId}
                      className={item.checked ? 'active' : ''}
                      onClick={this.selectTag.bind(this, item)}
                     >{item.tagName}</li>
            })
          }
        </ul>
    )
  }
}

export default Tags;