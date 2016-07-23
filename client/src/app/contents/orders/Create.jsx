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

import call from '../../api'

class CreateOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      orderedWorks: [],
      works: [],
      selectedService: null,
    }
  }

  componentDidMount() {
    call('works?filter[include]=service', 'GET').then(res => {
      res.json().then(works => {
        this.setState({
          works: works,
        })
      })
    })
  }

  submit() {
    const order = {
      customerTel: this.refs.customerTel.getValue(),
      customerName: this.refs.customerName.getValue(),
      amount: this.refs.amount.getValue(),
      orderedWorks: this.state.orderedWorks,
    }
    call('orders/createWithWorks', 'POST', {order}).then(res => {
      if(res.status === 200) {
        window.location = '#/orders/list'
      }
    })
  }

  cancel() {
    window.location = '/#/orders/list'
  }

  handleServiceChange(event, index, value) {
    this.setState({
      selectedService: value
    })
  }

  handleWearTypeChange(event, index, value) {
    const newWork = this.state.works.filter(w => w.id === value)[0]
    let orderedWorks = this.state.orderedWorks
    orderedWorks.push(newWork)
    this.setState({orderedWorks})
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
          <br/>
          <TextField
            hintText="金额"
            floatingLabelText="金额"
            value={this.state.orderedWorks.map(i => i.price)
              .reduce((a, b) => a + b, 0)}
            disabled={true}
            ref="amount"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
                <SelectField
                  hintText="服务项目"
                  value={this.state.selectedService}
                  onChange={::this.handleServiceChange}
                >
                  { this.state.works.map((item, index) =>
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
                  onChange={::this.handleWearTypeChange}
                >
                  {
                    this.state.works.filter(
                      w => w.service.name === this.state.selectedService).map(
                        (work, index) =>
                          <MenuItem
                            key={index}
                            value={work.id}
                            primaryText={work.wearType}
                          />
                        )
                  }

                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>价格</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.orderedWorks.map((work, index) =>
                <TableRow key={index}>
                  <TableRowColumn>
                    {work.service.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {work.wearType}
                  </TableRowColumn>
                  <TableRowColumn>
                    {work.price}
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

