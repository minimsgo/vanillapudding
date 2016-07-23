import React from 'react'

import ActionBar from './ActionBar.jsx'
import DataList from './DataList.jsx'
import Pagination from './Pagination.jsx'

class DataTable extends React.Component {

  static delay = 1000

  static propTypes = {
    toDetailPage: React.PropTypes.func,
    toCreatePage: React.PropTypes.func,
    schema: React.PropTypes.array,
    items: React.PropTypes.array,
    count: React.PropTypes.number,
    fetchItems: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      page: 1,
      perPage: 5,
      searchField: '',
      searchKeyword: '',
      timer: null,
      showDetailButton: false,
      selectedRows: [],
    }
  }

  handleRowSelection(selectedRows) {
    this.setState({
      showDetailButton: selectedRows.length === 1,
      selectedRows,
    })
  }

  componentDidMount() {
    this.setState({
      searchField: this.props.schema[0].name,
    })

    this.props.fetchItems({
      where: null,
      pagination: {
        page: this.state.page,
        perPage: this.state.perPage,
      }
    })
  }

  handleSearchFieldChange(event, index, value) {
    this.setState({
      searchField: value,
    })
  }

  makeWhere(schema, field, inputKeyword) {
    const type = schema.filter(s => s.name == field)[0].type

    if(inputKeyword === '') {
      this.setState({page: 1})
      return null
    }
    if (type === 'string') {
      return {
        field,
        op: 'like',
        value: `%25${inputKeyword}%25`
      }
    }
    if (type === 'number') {
      return {
        field,
        op: false,
        value: inputKeyword
      }
    }
  }

  handleSearchKeywordChange(event, newValue) {

    clearTimeout(this.state.timer)

    const oldValue = this.state.searchKeyword
    let timer = null
    if (newValue !== oldValue) {
      timer = setTimeout(() => {
        this.props.fetchItems({
          where: this.makeWhere(
            this.props.schema,
            this.state.searchField,
            newValue
          ),
          pagination: {
            page: this.state.page,
            perPage: this.state.perPage,
          }
        })
      }, DataTable.delay)
    }

    this.setState({searchKeyword: newValue, timer})
  }

  nearbyPage(n) {
    return function () {
      const page = this.state.page + n
      this.props.fetchItems({
        where: this.makeWhere(
          this.props.schema,
          this.state.searchField,
          this.state.searchKeyword,
        ),
        pagination: {
          page,
          perPage: this.state.perPage,
        }
      })
      this.setState({
        page,
      })
    }
  }

  render() {
    const searchableFields = this.props.schema.filter(
      s => s.type === 'string' || s.type === 'number'
    )

    const total = Math.floor(this.props.count / this.state.perPage) + 1
    const isLast = this.state.page === total

    const selectedItem = this.props.items[this.state.selectedRows[0]]

    return (
      <div>
        <ActionBar
          showDetailButton={this.state.showDetailButton}
          toDetailPage={this.props.toDetailPage(selectedItem)}
          toCreatePage={this.props.toCreatePage}
          schema={this.props.schema}
          searchableFields={searchableFields}
          searchField={this.state.searchField}
          searchKeyword={this.state.searchKeyword}
          handleSearchFieldChange={::this.handleSearchFieldChange}
          handleSearchKeywordChange={::this.handleSearchKeywordChange}
        />
        <DataList
          schema={this.props.schema}
          items={this.props.items}
          handleRowSelection={::this.handleRowSelection}
          selectedRows={this.state.selectedRows}
        />
        <Pagination
          showPrev={this.state.page !== 1}
          showNext={!isLast}
          prev={this.nearbyPage(-1).bind(this)}
          next={this.nearbyPage(1).bind(this)}
          current={`${this.state.page} / ${total}`}
        />
      </div>
    )
  }
}

export default DataTable
