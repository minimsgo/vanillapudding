import React from 'react'

import Create from './Create.jsx'
import Detail from './Detail.jsx'

class Form extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool,
    title: React.PropTypes.string,
    close: React.PropTypes.func,
    create: React.PropTypes.func,
    update: React.PropTypes.func,
    delete: React.PropTypes.func,
    item: React.PropTypes.object,
  }

  render() {
    return this.props.item ?
      <Detail
        title="详细信息"
        schema={this.props.schema}
        open={this.props.open}
        close={this.props.close}
        update={this.props.update}
        delete={this.props.delete}
        item={this.props.item}
      /> :
      <Create
        title="新建"
        schema={this.props.schema}
        open={this.props.open}
        create={this.props.create}
        close={this.props.close}
      />
  }
}

export default Form
