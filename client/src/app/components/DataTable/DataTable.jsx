import React from 'react'

import DataTableState from './DataTableState.jsx'
import call from '../../api'


class DataTable extends React.Component {

  static propTypes = {
    schema: React.PropTypes.array,
    endpoint: React.PropTypes.string,
    perPage: React.PropTypes.number,
  }

  constructor() {
    super()
    this.state = {
      items: [],
      page: 1,
      total: 0,
    }
  }

  componentDidMount() {
    this.fetch(null, 1)
  }

  fetch(where, page) {
    const perPage = this.props.perPage
    const skip = (page - 1) * perPage
    const pagination =
      `filter[skip]=${skip}&filter[limit]=${perPage}`

    const endpoint = where ?
      `${this.props.endpoint}?${pagination}&filter${where}` :
      `${this.props.endpoint}?${pagination}`

    call(endpoint, 'GET').then(res => {
      if (res.status !== 200) return
      res.json().then(items => {
        this.setState({items, page})
      })
    })

    const countEndpoint = where ?
      `${this.props.endpoint}/count?${where}`:
      `${this.props.endpoint}/count`

    call(countEndpoint, 'GET').then(res => {
      if (res.status !== 200) return
      res.json().then(countObject => {
        const count = countObject.count

        const total = count % this.props.perPage == 0 ?
          count / this.props.perPage :
          Math.floor(count / this.props.perPage) + 1
        this.setState({total})
      })
    })
  }

  onResponse(res, success) {
    if (res.status === 200) {
      this.fetch(null, 1)
      success()
    }
  }

  search(field, keyword, page) {
    const type = this.props.schema.filter(
      s => s.name == field)[0].type

    let where = null
    switch (type) {
      case 'string':
        where = `[${field}][like]=%25${keyword}%25`
        break
      case 'number':
        where = `[${field}]=${keyword}`
        break
      default:
        break
    }

    if (keyword === '') {
      this.fetch(null, page)
    } else {
      this.fetch(`[where]${where}`, page)
    }
  }

  create(success) {
    const func = function (item) {
      call(this.props.endpoint, 'POST', item).then(res => {
        this.onResponse(res, success)
      })
    }
    return func.bind(this)
  }

  update(success) {
    const func = function (id, item) {
      call(`${this.props.endpoint}/${id}`, 'PUT', item).then(res => {
        this.onResponse(res, success)
      })
    }
    return func.bind(this)
  }

  delete(success) {
    const func = function (id) {
      call(`${this.props.endpoint}/${id}`, 'DELETE').then(res => {
        this.onResponse(res, success)
      })
    }
    return func.bind(this)
  }

  render() {
    return (
      <DataTableState
        schema={this.props.schema}
        items={this.state.items}
        create={::this.create}
        update={::this.update}
        delete={::this.delete}
        search={::this.search}
        page={this.state.page}
        total={this.state.total}
      />
    )
  }
}

export default DataTable
