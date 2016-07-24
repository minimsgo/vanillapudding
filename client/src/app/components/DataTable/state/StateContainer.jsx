import React from 'react'

import DataList from '../view/DataList.jsx'
import Form from '../form/Form.jsx'
import ActionBar from '../view/ActionBar.jsx'
import Pagination from '../view/Pagination.jsx'

var selection = []

class StateContainer extends React.Component {

  static propTypes = {
    items: React.PropTypes.array,
    schema: React.PropTypes.array,
    create: React.PropTypes.func,
    update: React.PropTypes.func,
    delete: React.PropTypes.func,
    search: React.PropTypes.func,
    total: React.PropTypes.number,
  }

  constructor() {
    super()
    this.state = {
      open: false,
      selection: [],
      searchField: '',
      searchKeyword: '',
      timer: null,
    }
  }

  componentDidMount() {
    this.setState({
      searchField: this.searchable()[0].name
    })
  }

  open() {
    this.setState({
      open: true
    })
  }

  close() {
    this.setState({
      open: false
    })
  }

  select(rows) {
    this.setState({
      selection: rows
    })
    selection = rows
  }

  handleSearchFieldChange(event, index, value) {
    this.setState({
      searchField: value,
    })
  }

  handleSearchKeywordChange(event, value) {
    clearTimeout(this.state.timer)
    const oldValue = this.state.searchKeyword
    let timer = null
    if (value !== oldValue) {
      timer = setTimeout(() => {
        this.props.search(
          this.state.searchField,
          value,
          1
        )
      }, 1000)
    }

    this.setState({searchKeyword: value, timer})
  }

  nextPage() {
    const page = this.props.page + 1
    this.props.search(
      this.state.searchField,
      this.state.searchKeyword,
      page
    )
  }

  prevPage() {
    const page = this.props.page !== 1 ? this.props.page - 1 : 1
    this.props.search(
      this.state.searchField,
      this.state.searchKeyword,
      page
    )
  }

  searchable() {
    return this.props.schema.filter(field => {
        const searchableTypes = ['string', 'number', 'date']
        return searchableTypes.indexOf(field.type) !== -1
      }
    )
  }

  render() {
    const item = selection.length > 0 ?
      this.props.items[selection[0]] : null

    return (
      <div>
        <ActionBar
          open={this.open.bind(this)}
          schema={this.props.schema}
          showDetail={this.state.selection.length > 0}
          searchable={this.searchable()}
          searchField={this.state.searchField}
          searchKeyword={this.state.searchKeyword}
          searchableFields={this.state.searchKeyword}
          handleSearchFieldChange={::this.handleSearchFieldChange}
          handleSearchKeywordChange={::this.handleSearchKeywordChange}
        />
        <DataList
          schema={this.props.schema}
          items={this.props.items}
          select={this.select.bind(this)}
          selection={this.state.selection}
        />
        <Pagination
          nextPage={::this.nextPage}
          prevPage={::this.prevPage}
          showPrev={this.props.page !== 1}
          showNext={this.props.page !== this.props.total}
          page={this.props.page}
          total={this.props.total}
        />
        <Form
          title="新建"
          schema={this.props.schema}
          open={this.state.open}
          create={this.props.create(::this.close)}
          update={this.props.update(::this.close)}
          delete={this.props.delete(::this.close)}
          close={this.close.bind(this)}
          item={item}
        />
      </div>
    )
  }
}

export default StateContainer

