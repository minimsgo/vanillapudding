import React from 'react'
import DataTable from '../../components/DataTableOld/DataTable.jsx'

import callApi from '../../../middlewares/api'

import schema from './schema'
import store from '../../../store'

class ListProducts extends React.Component {

  constructor() {
    super()
    this.state = {
      items: [],
    }
  }
  
  handleReceiveItems(items) {
    const formatItems = items.map((item) => {
      item.serviceName = item.service.name 
      return item
    })
    this.setState({
      items: formatItems,
    })
  }

  componentWillMount() {
    callApi('products', 'GET').then((res) => {
      this.handleReceiveItems(res)
    })
  }

  search(query) {
    callApi(`products?q=${query}`, 'GET').then((res) => {
      this.handleReceiveItems(res) 
    })
  }

  edit(item) {
    return function () {
      store.selection = item
      window.location = '/#/products/edit'
    }
  }

  create() {
    window.location = '/#/products/create'
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

export default ListProducts
