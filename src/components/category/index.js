import React from 'react'

class Category extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  componentWillReceiveProps(nextProps) {
    let data = nextProps.data;
    let isAll = data.every((item, index) => {
      return !item.checked;
    });
    if (isAll) data[0].checked = true;
    this.setState({data: data});
  }
  selectCategory(item, e) {
    e.stopPropagation();
    let data = this.state.data;
    if (item.checked) return;
    for (let i=0; i<data.length; i++) {
      if (item.categoryId === data[i].categoryId) {
        data[i].checked = true;
      } else {
        data[i].checked = false;
      }
    }
    this.setState({data: data})
    this.props.onChangeSelect(item.categoryId);
  }
  render() {
    let data = this.state.data;
    return (
      <div>
        <ul>
        {
          data.map((item, index) => {
            return (
            <li key={item.categoryId}
                onClick={this.selectCategory.bind(this, item)}
                className={item.checked ? 'navThirdHover' : ''}>
              {item.categoryName}
            </li>
            )
          })
        }
        </ul>
      </div>
    )
  }
}

export default Category;