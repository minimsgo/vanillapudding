import React from 'react'
import DataTable from '../../components/DataTableOld/DataTable.jsx'

import call from '../../api'
import store from '../../store'

class ListOrders extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
      count: 0,
    }
  }

  toCreatePage() {
    window.location = '#/orders/create'
  }

  toDetailPage(selectedItem) {
    return function () {
      store.selection = selectedItem
      window.location = '#/orders/detail'
    }
  }

  fetchItems(filter) {
    const {where, pagination} = filter
    const paginationQueryString =
      `filter[limit]=${pagination.perPage}&filter[skip]=${(pagination.page - 1) * pagination.perPage}`
    const whereQueryString =
      where ? `filter[where][${where.field}][${where.op}]=${where.value}` : null

    const endpoint =
      whereQueryString ? `orders?filter[include][wears]&${paginationQueryString}&${whereQueryString}` :
        `orders?filter[include][wears]&${paginationQueryString}`
    call(endpoint, 'GET').then(res => {
      res.json().then(data => {
        this.setState({
          items: data
        })
      })
    })

    const countEndpoint =
      where ?
        `orders/count?[where][${where.field}][${where.op}]=${where.value}` :
        `orders/count`
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
        name: 'customerTel',
        displayName: '客户电话',
        type: 'string',
      },
      {
        name: 'customerName',
        displayName: '客户姓名',
        type: 'string',
      },
      {
        name: 'orderDate',
        displayName: '下单时间',
        type: 'date',
      },
      {
        name: 'amount',
        displayName: '金额',
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

export default ListOrders
