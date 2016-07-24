import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import lodash from 'lodash'

class Create extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    title: React.PropTypes.string,
    close: React.PropTypes.func,
    submit: React.PropTypes.func,
  }

  create() {
    const item = lodash.mapValues(this.refs, ref => ref.getValue())
    this.props.create(item)
  }

  render() {
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.close}
      />,
      <FlatButton
        label="确认"
        primary={true}
        onTouchTap={::this.create}
      />,
    ]

    const fields = this.props.schema.map((field, index) =>
      <TextField
        key={index}
        hintText={field.displayName}
        floatingLabelText={field.displayName}
        ref={field.name}
      />
    )
    return (
      <Dialog
        title={this.props.title}
        modal={false}
        actions={actions}
        open={this.props.open}
        autoScrollBodyContent={true}>
        {fields}
      </Dialog>
    )
  }
}


export default Create


