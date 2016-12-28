//import { connect } from 'react-redux'
import { compose } from 'redux'
import { DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend';

import Editor from '../components/MobileEditor'

export default compose(
  DragDropContext(TouchBackend)
)(Editor)
