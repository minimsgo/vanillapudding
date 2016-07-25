import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import lodash from 'lodash'

class CreateDialog extends React.Component {

  static propTypes = {
    cancel: React.PropTypes.func,
    submit: React.PropTypes.func,
    open: React.PropTypes.bool,
  }

  render() {
    const contentStyle = {
      width: '100%',
      maxWidth: 'none',
    }
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.cancel}
      />,
      <FlatButton
        label="确认"
        primary
        onTouchTap={this.props.submit}
      />,
    ]

    return (
      <Dialog
        title="title"
        modal={false}
        actions={actions}
        open={this.props.open}
        contentStyle={contentStyle}
        autoScrollBodyContent={true}>
      </Dialog>
    )
  }
}


export default CreateDialog


