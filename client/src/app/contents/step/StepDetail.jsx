import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'

import callApi from '../../../middlewares/api'
import store from '../../../store'

class StepDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      orderItem: {},
      works: {},
      hasNext: true,
    }
  }

  componentWillMount() {
    if (store.selection) {
      this.setState({
        orderItem: store.selection.orderItems[0],
        works: store.selection.works,
      })
    } else {
      this.cancel()
    }
  }

  step() {
    const current = Math.max.apply(Math, 
      this.state.works.map(i => i.step))
    return this.state.orderItem.product
      .service.flow[this.state.works[current].step]
  }

  cancel() {
    window.location = '/#/step/reader'
  }

  submit() {
    const current = Math.max.apply(Math, 
      this.state.works.map(i => i.step))
    const max = this.state.orderItem.product
        .service.flow.length - 1
    if (current < max) {
      callApi('works', 'POST', {
        orderItemId: this.state.orderItem.id,
        step: current + 1,
      }).then(res => {
        window.location = '/#/'
      })
    }
  }

  render() {
    const actionBarStyle = {
      backgroundColor: 'white',
    }
    const actionStyle = {
      marginLeft: -10,
    }

    return (
      <div>
        <div>
          <TextField
            floatingLabelText="客户电话"
            value={this.state.orderItem.order.customer.tel}
            disabled
          />
          <br />
          <TextField
            floatingLabelText="客户姓名"
            value={this.state.orderItem.order.customer.name}
            disabled
          />
          <br />
          <TextField
            floatingLabelText="衣物类型"
            value={this.state.orderItem.product.type}
            disabled
          />
          <br />
          <TextField
            floatingLabelText="服务项目"
            value={this.state.orderItem.product.service.name}
            disabled
          />
          <br />
          <TextField
            floatingLabelText="状态"
            value={::this.step()}
            disabled
          />
          <br />
        </div>

        <br />
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup float="left">
            <RaisedButton
              style={actionStyle}
              label="取消"
              onTouchTap={this.cancel}
            />
            <RaisedButton
              style={actionStyle}
              label="进入下一流程"
              disabled={!this.state.hasNext}
              primary
              onTouchTap={::this.submit}
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
export default StepDetail;

