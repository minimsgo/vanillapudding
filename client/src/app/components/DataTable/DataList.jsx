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
  }

  render() {
    return (
      <Table>
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
              <TableRow key={index}>
                {
                  this.props.schema.map((field, index) =>
                    <TableRowColumn key={index}>
                      {item[field.name]}
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

