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
import lodash from 'lodash'

import store from '../../store'
import call from '../../api'

class CreateOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      customerName: '',
      customerTel: '',
      amount: 0,
      wears: [],
    }
  }

  componentDidMount() {
    const selectedOrder = store.selection
    if (!selectedOrder) {
      window.location = '#/orders/list'

    } else {
      this.setState({
        customerName: selectedOrder.customerName,
        customerTel: selectedOrder.customerTel,
        amount: selectedOrder.amount,
      })
      const self = this
      const wearsWithWork = selectedOrder.wears.map(
        function (wear) {
          console.log(wear.id)
          call(`wears/${wear.id}?filter[include][work]`, 'GET').then(
            res => {
              res.json().then(wear => {
                const wears = self.state.wears
                wears.push(wear)
                self.setState({wears})
              })
            }
          )
        }
      )
    }
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
            hintText="客户电话"
            value={this.state.customerTel}
            floatingLabelText="客户电话"
            disabled={true}
          />
          <br />
          <TextField
            hintText="客户姓名"
            value={this.state.customerName}
            floatingLabelText="客户姓名"
            disabled={true}
          />
          <br/>
          <TextField
            hintText="金额"
            floatingLabelText="金额"
            value={this.state.amount}
            disabled={true}
          />
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
              this.state.wears.map((wear, index) =>
                <TableRow key={index}>
                  <TableRowColumn>
                    {wear.workId}
                  </TableRowColumn>
                </TableRow>
              )
            }

          </TableBody>
        </Table>
        <br />
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup>
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
export default CreateOrder;

