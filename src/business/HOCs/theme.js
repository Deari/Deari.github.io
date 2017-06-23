import { PropTypes } from 'react'
import { withContext, getContext } from 'utils/context'

const themePropTypes = {
  theme: PropTypes.object
}

const themeManager = {
  apps: {
    type: 'apps',
    text: '应用'
  },
  widgets: {
    type: 'widgets',
    text: '组件'
  },
  hardware: {
    type: 'hardware',
    text: '硬件'
  }
}

export function withTheme (type) {
  return withContext(themePropTypes,() => ({ theme: themeManager[type] }))
}

export const getTheme = (Component) => {
  return getContext(themePropTypes)(Component)
}