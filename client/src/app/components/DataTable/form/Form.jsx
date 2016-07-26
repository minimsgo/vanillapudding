import React, {Component} from 'react'
import Create from './Create.jsx'
import Detail from './Detail.jsx'

class Form extends Component {

  static propTypes = {
    open: React.PropTypes.bool,
    edit: React.PropTypes.bool,
    schema: React.PropTypes.array,
    hide: React.PropTypes.func,
    selectedItem: React.PropTypes.object,
    selectedRow: React.PropTypes.number,

    create: React.PropTypes.func,
    update: React.PropTypes.func,
    delete: React.PropTypes.func,
  }

  render() {
    return this.props.selectedItem ?
      <Detail
        title="编辑"
        open={this.props.open}
        schema={this.props.schema}
        hide={this.props.hide}
        item={this.props.selectedItem}
        update={this.props.update}
        delete={this.props.delete}
      /> :
      <Create
        title="新建"
        open={this.props.open}
        schema={this.props.schema}
        hide={this.props.hide}
        create={this.props.create}
      />

  }
}

export default Form
