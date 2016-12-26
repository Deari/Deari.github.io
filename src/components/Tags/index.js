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
    console.log( this.state.tags)
    return (
        <ul className="step_form_row_right step_form_row_right_ul">
        {
         this.state.tags.map((item, index) => {
            return <li key={item.tagId} 
                       className={item.checked ? 'step_form_row_right_li active' : 'step_form_row_right_li'}
                       onClick={this.selectTag.bind(this, item)}>{item.tagName}</li>
          })
        }
        </ul>
    )
  }
}

export default Tags;