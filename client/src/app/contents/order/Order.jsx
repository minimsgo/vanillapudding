import React from 'react'
import DataTable from './DataTableNext/DataTable.jsx'

class Order extends React.Component {

  render() {
    const schema = [
      {
        name: 'customerTel',
        displayName: '电话号码',
        type: 'string',
      },
      {
        name: 'customerName',
        displayName: '客户姓名',
        type: 'string',
      },
      {
        name: 'orderDate',
        displayName: '下单日期',
        type: 'date',
      },
      {
        name: 'amount',
        displayName: '金额',
        type: 'number',
      },
      {
        name: 'state',
        displayName: '状态',
        type: 'string',
      },
    ]
    return (
      <div>
        <DataTable
          schema={schema}
          perPage={10}
          endpoint="orders"
          params="filter[include][wears]"
        >
        </DataTable>
      </div>
    )
  }
}

export default Order
