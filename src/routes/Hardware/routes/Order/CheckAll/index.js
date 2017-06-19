/**
 * Created by lizhuo on 2017/6/15.
 */
import React from 'react';

const CheckAll = (props) => {

  const {checkedList, onChange, index, checkedALl, data} = props;

  return (
    <input type="checkbox" onChange={onChange} checked={checkedList?checkedList[index]:checkedALl}/>
  )
}

export default CheckAll
