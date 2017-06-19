/**
 * Created by lizhuo on 2017/6/14.
 */
import React from 'react'

const Modal = (props) => {

  const { active, detail } = props

  return(
    <div>{active.toString()}</div>
  )
}

export default Modal
