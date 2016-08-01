import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import lodash from 'lodash'

class Create extends Component {

  static propTypes = {
    schema: React.PropTypes.array,
    title: React.PropTypes.string,
    open: React.PropTypes.bool,
    hide: React.PropTypes.func,
    create: React.PropTypes.func,
    titleStyle: React.PropTypes.object,
  }

  create() {
    const item = lodash.mapValues(this.refs, ref => ref.getValue())
    this.props.create(item, this.props.hide)
  }

  render() {
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.hide}
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
        titleStyle={this.props.titleStyle}
        open={this.props.open}
        autoScrollBodyContent={true}>
        {fields}
      </Dialog>
    )
  }
}

export default Create
