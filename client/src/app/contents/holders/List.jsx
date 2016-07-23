import React from 'react'
import DataTable from '../../components/DataTableOld/DataTable.jsx'

import call from '../../api'
import store from '../../store'

class ListHolders extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
      count: 0,
    }
  }

  toCreatePage() {
    window.location = '#/holders/create'
  }

  toDetailPage(selectedItem) {
    return function () {
      store.selection = selectedItem
      window.location = '#/holders/detail'
    }
  }

  fetchItems(filter) {
    const {where, pagination} = filter
    const paginationQueryString =
      `filter[limit]=${pagination.perPage}&filter[skip]=${(pagination.page - 1) * pagination.perPage}`
    const whereQueryString =
      where ? `filter[where][${where.field}][${where.op}]=${where.value}` : null

    const endpoint =
      whereQueryString ? `holders?${paginationQueryString}&${whereQueryString}` :
        `holders?${paginationQueryString}`
    call(endpoint, 'GET').then(res => {
      res.json().then(data => {
        const items = data
        this.setState({
          items
        })
      })
    })

    const countEndpoint =
      where ?
        `holders/count?[where][${where.field}][${where.op}]=${where.value}` :
        `holders/count`
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
        name: 'code',
        displayName: '编号',
        type: 'number',
      },
      {
        name: 'state',
        displayName: '状态',
        type: 'string',
      }
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

export default ListHolders
