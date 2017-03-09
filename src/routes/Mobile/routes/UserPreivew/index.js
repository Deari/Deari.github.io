import React, { Component } from 'react'
import UserPreview from '../../containers/UserPreviewContainer'

export default store => ({
  path: 'user/preview/:pageID',
  component: UserPreview
})
