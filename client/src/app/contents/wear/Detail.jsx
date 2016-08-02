import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import lodash from 'lodash'
import call from '../../api'

class Detail extends Component {

  constructor() {
    super()
    this.state = {
      wear: {
        order: {},
        service: {},
        holder: {},
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
    call(`wears/${id}/nextStep`, 'GET').then(res => {
      if (res.status === 200) {
        this.props.hide()
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
        disabled={
          this.state.wear.currentStep === '就绪' ||
          this.state.wear.currentStep === '结束'
        }
        onTouchTap={::this.nextStep}
      />
    ]

    const contentStyle = {
      width: '100%',
      maxWidth: 'none',
    }


    return (
      <Dialog
        title="衣物详情"
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
        &nbsp;
        <TextField
          value={this.state.wear.order.customerTel}
          floatingLabelText="客户电话"
          disabled
        />
        &nbsp;
        <TextField
          value={this.state.wear.order.orderDate}
          floatingLabelText="下单日期"
          disabled
        />
        &nbsp;
        <TextField
          value={this.state.wear.service.name}
          floatingLabelText="服务项目"
          disabled
        />
        &nbsp;
        <TextField
          value={this.state.wear.service.type}
          floatingLabelText="类型"
          disabled
        />
        &nbsp;
        <TextField
          value={this.state.wear.service.wear}
          floatingLabelText="衣物"
          disabled
        />
        &nbsp;
        <TextField
          value={this.state.wear.holder.code}
          floatingLabelText="挂衣号"
          disabled
        />
        &nbsp;
        <TextField
          value={this.state.wear.currentStep}
          floatingLabelText="当前流程"
          disabled
        />
      </Dialog>
    )
  }
}

export default Detail

