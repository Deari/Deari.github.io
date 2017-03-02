import React from 'react'
import { IndexLink, Link } from 'react-router'
import './pager.scss'

const arrFilter = (arrList,currentPageIndex,pageSum)=>{
  let newList = [];
  switch(parseInt(currentPageIndex)) {
      case 1:
        return newList = arrList.filter((v)=>
                v.value == parseInt(currentPageIndex) || 
                v.value == parseInt(currentPageIndex)+1 || 
                v.value == parseInt(currentPageIndex)+2 || 
                v.value == parseInt(currentPageIndex)+3 ||
                v.value == parseInt(currentPageIndex)+4
              )
        break
      case 2:
        return newList = arrList.filter((v)=>
                v.value == parseInt(currentPageIndex) || 
                v.value == parseInt(currentPageIndex)-1 || 
                v.value == parseInt(currentPageIndex)+1 || 
                v.value == parseInt(currentPageIndex)+2 ||
                v.value == parseInt(currentPageIndex)+3
              )
        break
      case parseInt(pageSum)-1 :
        return newList = arrList.filter((v)=>
                v.value == parseInt(currentPageIndex) || 
                v.value == parseInt(currentPageIndex)-1 || 
                v.value == parseInt(currentPageIndex)-2 || 
                v.value == parseInt(currentPageIndex)-3 ||
                v.value == parseInt(currentPageIndex)+1
              )
        break
      case parseInt(pageSum):
        return newList = arrList.filter((v)=>
                v.value == parseInt(currentPageIndex) || 
                v.value == parseInt(currentPageIndex)-1 || 
                v.value == parseInt(currentPageIndex)-2 || 
                v.value == parseInt(currentPageIndex)-3 ||
                v.value == parseInt(currentPageIndex)-4
              )
        break
      default:
        return newList = arrList.filter((v)=>
                v.value == parseInt(currentPageIndex) || 
                v.value == parseInt(currentPageIndex)-1 || 
                v.value == parseInt(currentPageIndex)-2 || 
                v.value == parseInt(currentPageIndex)+1 ||
                v.value == parseInt(currentPageIndex)+2
              )
    }
}   
const Pager = props => {
 
  const {
    changePage, 
    changePrevPage, 
    changeNextPage, 
    changeSelect, 
    pageSum, 
    currentPageIndex,
    pageIndexs, 
    changeLimit,
    limitList,
  } = props
  const newList = arrFilter(pageIndexs,currentPageIndex,pageSum)

  return(
  <div className="list-page">
    <span className="page-num" onClick={e=>changePage(e,1)}>首页</span>
    <span className="page-num" onClick={changePrevPage}>上一页</span>
    {
      newList.map((item,index)=>(
        <span className={currentPageIndex == item.value?'page-num active':'page-num'}  onClick={e=>changePage(e,item.value)} key={index}>{item.value}</span>
      ))
    }
    <span className="page-num" onClick={changeNextPage}>下一页</span>
    <span className="page-num" onClick={e=>changePage(e,pageSum)}>尾页</span>
    <span>
    第
    <select onChange={e=>changeSelect(e)}>
      {
        pageIndexs.map((item,index)=>(
          <option key={index} value={item.value} selected={item.value===currentPageIndex}>{item.value}</option>
        ))
      }
    </select>
    页/共{pageSum}页
    </span>
    <span>
      显示
      <select  onChange={e=>changeLimit(e)}>
        <option value="-1">请选择</option>
        {
          limitList.map((item,index)=>(
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