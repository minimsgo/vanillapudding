import React from 'react';
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'

import DataTableToolbar from './DataTableToolbar.jsx'

export default class DataTable extends React.Component {

  static propTypes = {
    schema: React.PropTypes.array,
    items: React.PropTypes.array,
    search: React.PropTypes.func,
    edit: React.PropTypes.func,
    create: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      items: [],
      query: {
        field: '',
        keyword: '',
      },
      timer: null,
      selectedRows: [],
      showEditButton: false,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.items !== this.state.items) {
      this.setState({
        items: newProps.items,
      })
    }
  }
 
  onRowSelection(selectedRows) {
    this.setState({
      showEditButton: selectedRows.length === 1,
      selectedRows,
    })

  }
  
  render() {
    const selectedItem = this.state.items[this.state.selectedRows]
    return (
      <div>
        <DataTableToolbar
          create={this.props.create}
          schema={this.props.schema}
          search={this.props.search}
          edit={this.props.edit(selectedItem)}
          showEditButton={this.state.showEditButton}
        />
        <Table onRowSelection={::this.onRowSelection}>
          <TableHeader>
            <TableRow>
              {this.props.schema.map((field, index) =>
                <TableHeaderColumn key={index}>
                  {field.displayName}
                </TableHeaderColumn>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.items.map((item, index) =>
              <TableRow
                key={index}
                selected={this.state.selectedRows.indexOf(index) !== -1}>
                { this.props.schema.map((field, index)=>
                  <TableRowColumn key={index}>
                    {item[field.name]}
                  </TableRowColumn>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

