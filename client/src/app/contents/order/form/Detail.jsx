import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Table from 'material-ui/Table/Table'
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn'
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'
import Checkbox from 'material-ui/Checkbox'

import call from '../../../api'
import lodash from 'lodash'

class Detail extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    title: React.PropTypes.string,
    submit: React.PropTypes.func,
    hide: React.PropTypes.func,
    item: React.PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      order: {
        wears: []
      },
      selectedRow: -1,
    }
  }

  componentDidMount() {
    call(`orders/${this.props.item.id}/findNested`, 'GET').then(
      res => {
        if (res.status === 200) {
          res.json().then(json => {
            this.setState({order: json.order})
          })
        }
      }
    )
  }

  select(rows) {
    const row = rows.length !== 0 ? rows[0] : -1
    this.setState({selectedRow: row})
  }

  nextStep() {
    const id = this.state.order.wears[this.state.selectedRow].id
    call(`wears/${id}/nextStep`, 'GET').then(res => {
      if (res.status === 200) {
        this.props.hide()
      }
    })
  }

  render() {
    const selectedWear = this.state.order.wears[this.state.selectedRow]
    const nextDisabled = this.state.selectedRow === -1 ||
      selectedWear.currentStep !== '就绪'

    const contentStyle = {
      width: '100%',
      maxWidth: 'none',
    }
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.hide}
      />,
      <FlatButton
        label="下一流程"
        primary
        disabled={nextDisabled}
        onTouchTap={::this.nextStep}
      />,
    ]

    return (
      <Dialog
        title={this.props.title}
        modal={false}
        actions={actions}
        open={this.props.open}
        contentStyle={contentStyle}
        autoScrollBodyContent={true}>
        <div>
          <TextField
            value={this.props.item.customerTel}
            floatingLabelText="客户电话"
            disabled
          />
          &nbsp;
          <TextField
            value={this.props.item.customerName}
            floatingLabelText="客户姓名"
            disabled
          />
          &nbsp;
          <TextField
            value={this.props.item.orderDate}
            floatingLabelText="下单时间"
            disabled
          />
          &nbsp;
          <TextField
            value={this.props.item.amount }
            floatingLabelText="金额"
            disabled
          />
        </div>
        <Table onRowSelection={::this.select}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>条形码</TableHeaderColumn>
              <TableHeaderColumn>类型</TableHeaderColumn>
              <TableHeaderColumn>服务项目</TableHeaderColumn>
              <TableHeaderColumn>衣物</TableHeaderColumn>
              <TableHeaderColumn>瑕疵</TableHeaderColumn>
              <TableHeaderColumn>挂衣号</TableHeaderColumn>
              <TableHeaderColumn>状态</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.order.wears.map((wear, index) =>
                <TableRow
                  selected={this.state.selectedRow === index}
                  key={index}>
                  <TableRowColumn>
                    {wear.barcode}
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.service.type}
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.service.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.service.wear}
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      checked={wear.hasStains}
                      disabled
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.holder.code}
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.currentStep}
                  </TableRowColumn>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Dialog>
    )
  }
}


export default Detail

