import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import call from '../../api'

class Detail extends Component {

  constructor() {
    super()
    this.state = {
      wear: {
        order: {}
      }
    }
  }


  componentWillReceiveProps(newProps) {
    this.setState({
      wear: newProps.wear
    })
  }

  nextStep() {
    const id = this.state.wear.id
    call(`wears/${id}/toNextState`, 'GET').then(res => {
      if (res.status === 200) {
        res.json().then(updatedWear => {
          this.setState({wear: updatedWear.updatedWear})
        })
      }
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.hide}
      />,
      <FlatButton
        label="下一流程"
        primary
        disabled={this.state.wear.currentState == "结束"}
        onTouchTap={::this.nextStep}
      />
    ]

    const contentStyle = {
      width: '100%',
      maxWidth: 'none',
    }

    return (
      <Dialog
        title="WEAR"
        modal={false}
        actions={actions}
        open={this.props.open}
        contentStyle={contentStyle}
        autoScrollBodyContent={true}>

        <TextField
          value={this.state.wear.order.customerName}
          floatingLabelText="客户姓名"
          disabled
        />
        <TextField
          value={this.state.wear.order.customerTel}
          floatingLabelText="客户电话"
          disabled
        />
        <TextField
          value={this.state.wear.serviceName}
          floatingLabelText="服务项目"
          disabled
        />
        <TextField
          value={this.state.wear.type}
          floatingLabelText="衣物类型"
          disabled
        />
        <TextField
          value={this.state.wear.order.orderDate}
          floatingLabelText="下单日期"
          disabled
        />
        <TextField
          value={this.state.wear.currentState}
          floatingLabelText="状态"
          disabled
        />
      </Dialog>
    )
  }
}

export default Detail
