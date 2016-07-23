import React from 'react'

import Create from './Create.jsx'
import Detail from './Create.jsx'

class Form extends React.Component {
  static propTypes = {
    open: React.PropTypes.bool,
    title: React.PropTypes.string,
    close: React.PropTypes.func,
    submit: React.PropTypes.func,
    item: React.PropTypes.object,
  }

  render() {
    return this.props.item ?
      <Detail
        title="详细信息"
        schema={this.props.schema}
        open={this.props.open}
        submit={this.props.submit}
        close={this.props.close}
      /> :
      <Create
        title="新建"
        schema={this.props.schema}
        open={this.props.open}
        submit={this.props.submit}
        close={this.props.close}
      />
  }
}

export default Form
