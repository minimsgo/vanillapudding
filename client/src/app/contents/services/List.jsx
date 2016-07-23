import React from 'react'
import DataTable from '../../components/DataTable/DataTable.jsx'

import call from '../../api'
import store from '../../store'

class ListServices extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
      count: 0,
    }
  }

  toCreatePage() {
    window.location = '#/services/create'
  }

  toDetailPage(selectedItem) {
    return function () {
      store.selection = selectedItem
      window.location = '#/services/detail'
    }
  }

  fetchItems(filter) {
    const {where, pagination} = filter
    const paginationQueryString =
      `filter[limit]=${pagination.perPage}&filter[skip]=${(pagination.page - 1) * pagination.perPage}`
    const whereQueryString =
      where ? `filter[where][${where.field}][${where.op}]=${where.value}` : null

    const endpoint =
      whereQueryString ? `services?${paginationQueryString}&${whereQueryString}` :
        `services?${paginationQueryString}`
    call(endpoint, 'GET').then(res => {
      res.json().then(data => {
        this.setState({
          items: data
        })
      })
    })

    const countEndpoint =
      where ? `services/count?[where][${where.field}][${where.op}]=${where.value}` :
        `services/count`
    call(countEndpoint, 'GET').then(res => {
      res.json().then(data => {
        this.setState({
          count: data.count
        })
      })
    })

  }

  render() {
    const schema = [
      {
        name: 'name',
        displayName: '名称',
        type: 'string',
      },
      {
        name: 'flow',
        displayName: '流程',
        type: 'array',
      },
    ]

    return (
      <DataTable
        schema={schema}
        items={this.state.items}
        count={this.state.count}
        fetchItems={::this.fetchItems}
        toCreatePage={this.toCreatePage}
        toDetailPage={this.toDetailPage}
      />
    )
  }
}

export default ListServices
