import React from 'react'
import { IndexLink, Link } from 'react-router'
import './pager.scss'
const arrFilter = (arrList,currentPageIndex)=>{
   const newList = arrList.filter((v)=>
     v.value == parseInt(currentPageIndex) || 
     v.value == parseInt(currentPageIndex)+1 || 
     v.value == parseInt(currentPageIndex)+2 || 
     v.value == parseInt(currentPageIndex)-1 ||
     v.value == parseInt(currentPageIndex)-2
     )
  return newList
}   
const Pager = props => {
  const newList = arrFilter(props.pageIndexs,props.currentPageIndex)
  console.log(newList,props.currentPageIndex)
  console.log(props.pageIndexs)
  return(
  <div className="list-page">
    <span className="page-num" onClick={e=>props.changePage(e,1)}>首页</span>
    <span className="page-num" onClick={props.changePrevPage}>上一页</span>
    {
      newList.map((item,index)=>(
        <span className="page-num" onClick={e=>props.changePage(e,item.value)} key={index}>{item.value}</span>
      ))
    }
    <span className="page-num" onClick={props.changeNextPage}>下一页</span>
    <span className="page-num" onClick={e=>props.changePage(e,props.pageSum)}>尾页</span>
    <span>
    第
    <select onChange={e=>props.changeSelect(e)}>
      {
        props.pageIndexs.map((item,index)=>(
          <option key={index} value={item.value} selected={item.value===props.currentPageIndex}>{item.value}</option>
        ))
      }
    </select>
    页/共{props.pageSum}页
    </span>
    <span>
      显示
      <select  onChange={e=>props.changeLimit(e)}>
        <option value="-1">请选择</option>
        {
          props.limitList.map((item,index)=>(
            <option key={index} value={item}>{item}</option>
          ))
        }
      </select>
      条
    </span>
   
  </div>
  )
}
export default Pager