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

import lodash from 'lodash'

class Detail extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    title: React.PropTypes.string,
    submit: React.PropTypes.func,
    hide: React.PropTypes.func,
    item: React.PropTypes.object,
  }

  render() {
    const contentStyle = {
      width: '100%',
      maxWidth: 'none',
    }
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.hide}
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
          <TextField
            value={this.props.item.customerName}
            floatingLabelText="客户姓名"
            disabled
          />
          <TextField
            value={this.props.item.amount }
            floatingLabelText="金额"
            disabled
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>条形码</TableHeaderColumn>
              <TableHeaderColumn>服务项目</TableHeaderColumn>
              <TableHeaderColumn>衣物类型</TableHeaderColumn>
              <TableHeaderColumn>状态</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.props.item.wears.map((wear, index) =>
                <TableRow key={index}>
                  <TableRowColumn>
                    {wear.barcode}
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.serviceName}
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.type}
                  </TableRowColumn>
                  <TableRowColumn>
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
