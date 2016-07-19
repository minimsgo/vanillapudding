import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'

import callApi from '../../../middlewares/api'
import store from '../../../store'

class OrderDetail extends React.Component {
  constructor() {
    super()
    this.state = {
      order: {
        customerTel: '',
        customerName: '',
        amount: 0,
      },
      orderItems: [],
    }
  }

  componentWillMount() {
    const order = store.selection
    if (order) {
      const q = { orderId: order.id }
      callApi(`order_items?q=${JSON.stringify(q)}`, 'GET').then(res => {
        const orderItems = res.orderItems.map(
          orderItem => Object.assign(orderItem,{
            works: res.works.filter(work =>
              work.orderItemId === orderItem.id
            ),
          }))
        this.setState({
          order,
          orderItems,
        })
      })
    } else {
      this.cancel()
    }
  }
  
  step(item) {
    const max = Math.max.apply(Math, item.works.map(i => i.step))
    return item.product.service.flow[item.works[max].step]
  }

  cancel() {
    window.location = '/#/orders/list'
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
            value={this.state.order.customerTel}
            floatingLabelText="客户电话"
            disabled
          />
          <br />
          <TextField
            value={this.state.order.customerName}
            floatingLabelText="客户姓名"
            disabled
          />
          <br />
          <TextField
            value={this.state.order.amount }
            floatingLabelText="金额"
            disabled
          />
          <br />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>服务项目</TableHeaderColumn>
              <TableHeaderColumn>衣物类型</TableHeaderColumn>
              <TableHeaderColumn>价格</TableHeaderColumn>
              <TableHeaderColumn>状态</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.orderItems.map((item, index) =>
                <TableRow key={index}>
                  <TableRowColumn>
                    {item.product.service.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.product.type}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.product.price}
                  </TableRowColumn>
                  <TableRowColumn>
                    {::this.step(item)}
                  </TableRowColumn>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
        <br />
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup float="left">
            <RaisedButton
              style={actionStyle}
              label="取消"
              onTouchTap={this.cancel}
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
export default OrderDetail;

