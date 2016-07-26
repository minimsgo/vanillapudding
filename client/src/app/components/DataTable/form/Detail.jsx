import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import lodash from 'lodash'

class Detail extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    title: React.PropTypes.string,
    submit: React.PropTypes.func,
    hide: React.PropTypes.func,
    item: React.PropTypes.object,
  }

  update() {
    const item = lodash.mapValues(this.refs, ref => ref.getValue())
    this.props.update(this.props.item.id, item, this.props.hide)
  }

  delete() {
    this.props.delete(this.props.item.id, this.props.hide)
  }

  render() {
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.hide}
      />,
      <FlatButton
        label="删除"
        secondary={true}
        onTouchTap={::this.delete}
      />,
      <FlatButton
        label="确认"
        primary={true}
        onTouchTap={::this.update}
      />,
    ]

    const fields = this.props.schema.map((field, index) =>
      <TextField
        key={index}
        defaultValue={this.props.item[field.name]}
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


export default Detail
