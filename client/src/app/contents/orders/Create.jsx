import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'
import lodash from 'lodash'

import callApi from '../../../middlewares/api'

class CreateOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      orderProducts: [],
      products: [],
      filtratedProducts: [],
      currentProduct: {},
    }
  }

  componentWillMount() {
    callApi('products', 'GET').then((res) => {
      this.setState({
        products: res,
        filtratedProducts: res,
      })
    })
  }

  submit() {
    const order = {
      customerTel: this.refs.customerTel.getValue(),
      customerName: this.refs.customerName.getValue(),
      amount: this.refs.amount.getValue(),
      orderProducts: this.state.orderProducts.map(item => item.id),
    }
    callApi('orders', 'POST', order).then(res => {
      // this.cancel()
    })
  }

  cancel() {
    window.location = '/#/orders/list'
  }

  handleServiceChange(event, index, value) {
    const filtratedProducts = this.state.products.filter(item => item.service.name === value)
    if (filtratedProducts.length === 1) {
      const orderProducts = this.state.orderProducts
      orderProducts.push(filtratedProducts[0])
      this.setState({
        currentProduct: {},
        orderProducts,
        filtratedProducts,
      })
    } else {
      this.setState({
        currentProduct: {
          type: this.state.currentProduct.type,
          serviceName: value,
        },
        filtratedProducts,
      })
    }
  }

  handleTypeChange(event, index, value) {
    const filtratedProducts = this.state.products.filter(item => item.type === value)
    if (filtratedProducts.length === 1) {
      const orderProducts = this.state.orderProducts
      orderProducts.push(filtratedProducts[0])
      this.setState({
        currentProduct: {},
        orderProducts,
        filtratedProducts: this.state.products,
      })
    } else {
      this.setState({
        currentProduct: {
          type: value,
          serviceName: this.state.currentProduct.serviceName,
        },
        filtratedProducts,
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
            hintText="客户电话"
            floatingLabelText="客户电话"
            ref="customerTel"
          />
          <br />
          <TextField
            hintText="客户姓名"
            floatingLabelText="客户姓名"
            ref="customerName"
          />
          <br />
          <TextField
            hintText="金额"
            floatingLabelText="金额"
            disabled
            value={
              this.state.orderProducts.map(item => item.price).reduce(lodash.add, 0)
            }
            ref="amount"
          />
          <br />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
                <SelectField
                  hintText="服务项目"
                  value={this.state.currentProduct.serviceName}
                  onChange={::this.handleServiceChange}
                >
                  { this.state.products.map((item, index) =>
                    <MenuItem
                      key={index}
                      value={item.service.name}
                      primaryText={item.service.name}

                    />
                  )}
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  hintText="衣物类型"
                  value={this.state.currentProduct.type}
                  onChange={::this.handleTypeChange}
                >
                  { this.state.filtratedProducts.map((item, index) =>
                    <MenuItem
                      key={index}
                      value={item.type}
                      primaryText={item.type}
                    />
                  )}
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>价格</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.orderProducts.map((item, index) =>
                <TableRow key={index}>
                  <TableRowColumn>
                    {item.service.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.type}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.price}
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
            <RaisedButton
              label="确认"
              style={actionStyle}
              onTouchTap={::this.submit}
              primary
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
export default CreateOrder;

