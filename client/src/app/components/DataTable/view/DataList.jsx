import React, { Component } from 'react';
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'

import formatDate from '../../../utils/date'

//TODO 大数据量性能问题
class DataList extends Component {

  static propTypes = {
    schema: React.PropTypes.array,
    items: React.PropTypes.array,
    select: React.PropTypes.func,
    selectedRow: React.PropTypes.number,
  }

  select(rows) {
    if (rows.length !== 0) {
      this.props.select(this.props.items[rows[0]], rows[0])
    } else {
      this.props.select(null, -1)
    }
  }

  render() {
    return (
      <Table onRowSelection={::this.select}>
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
                selected={this.props.selectedRow === index}
              >
                {
                  this.props.schema.map((field, index) =>
                    <TableRowColumn key={index}>
                      {
                        field.type === 'date' ?
                          formatDate(item[field.name]) :
                          item[field.name]
                      }
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

export default DataList
