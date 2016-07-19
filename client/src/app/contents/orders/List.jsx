import React from 'react'
import DataTable from '../../components/DataTableOld/DataTable.jsx'

import callApi from '../../../middlewares/api'
import store from '../../../store'

import schema from './schema'

class ListOrders extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
    }
  }

  handleReceiveItems(items) {
    const orders = items.map(item => {
      const newItem = item 
      newItem.customerName = newItem.customer.name
      newItem.customerTel = newItem.customer.tel
      return newItem
    })
    this.setState({
      items: orders
    })
  }

  componentWillMount() {
    callApi('orders', 'GET').then((res) => {
      this.handleReceiveItems(res)
    })
  }

  search(query) {
    callApi(`orders?q=${query}`, 'GET').then((res) => {
      this.handleReceiveItems(res) 
    })
  }

  edit(item) { 
    return function () {
      store.selection = item
      window.location = '/#/orders/detail'
    }
  }

  create() {
    window.location = '/#/orders/create'
  }

  render() {
    const dataTable =
      <DataTable
        schema={schema}
        items={this.state.items}
        create={this.create}
        search={::this.search}
        edit={this.edit}
      />

    return dataTable
  }
}

export default ListOrders
