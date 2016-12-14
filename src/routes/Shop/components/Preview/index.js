import React from 'react'
import './Preview.scss'

export const Preview = (props) => (
  <div className="preview-container">
    {JSON.stringify(props)}
  </div>
)

export default Preview
