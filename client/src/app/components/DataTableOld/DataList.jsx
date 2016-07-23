import React from 'react';
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'


export default class DataList extends React.Component {

  static propTypes = {
    schema: React.PropTypes.array,
    items: React.PropTypes.array,
    selectedRows: React.PropTypes.array,
    handleRowSelection: React.PropTypes.func,
  }

  render() {
    return (
      <Table onRowSelection={this.props.handleRowSelection}>
        <TableHeader>
          <TableRow>
            {
              this.props.schema.map((field, index) =>
                <TableHeaderColumn key={index}>
                  {field.displayName}
                </TableHeaderColumn>
              )
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            this.props.items.map((item, index) =>
              <TableRow
                key={index}
                selected={this.props.selectedRows.indexOf(index) !== -1}>
              >
                {
                  this.props.schema.map((field, index) =>
                    <TableRowColumn key={index}>
                      {item[field.name].toString()}
                    </TableRowColumn>
                  )
                }
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    )
  }
}

