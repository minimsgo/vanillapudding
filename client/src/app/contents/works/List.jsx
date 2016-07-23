import React from 'react'
import DataTable from '../../components/DataTable/DataTable.jsx'

import call from '../../api'
import store from '../../store'

class ListWorks extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
      count: 0,
    }
  }

  toCreatePage() {
    window.location = '#/works/create'
  }

  toDetailPage(selectedItem) {
    return function () {
      store.selection = selectedItem
      window.location = '#/works/detail'
    }
  }

  fetchItems(filter) {
    const {where, pagination} = filter
    const paginationQueryString =
      `filter[limit]=${pagination.perPage}&filter[skip]=${(pagination.page - 1) * pagination.perPage}`
    const whereQueryString =
      where ? `filter[where][${where.field}][${where.op}]=${where.value}` : null

    const endpoint =
      whereQueryString ? `works?filter[include]=service&${paginationQueryString}&${whereQueryString}` :
        `works?filter[include]=service&${paginationQueryString}`
    call(endpoint, 'GET').then(res => {
      res.json().then(data => {
        const items = data.map(i => {
          return Object.assign(i, {
            serviceName: i.service.name
          })
        })
        this.setState({
          items
        })
      })
    })

    const countEndpoint =
      where ?
        `works/count?[where][${where.field}][${where.op}]=${where.value}` :
        `works/count`
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
        name: 'serviceName',
        displayName: '服务项目',
        type: 'string',
      },
      {
        name: 'wearType',
        displayName: '衣物类型',
        type: 'string',
      },
      {
        name: 'price',
        displayName: '价格',
        type: 'number',
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

export default ListWorks
