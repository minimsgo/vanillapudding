import React from 'react'
import DataTable from '../components/DataTable/DataTable.jsx'

class Service extends React.Component {

  render() {
    const schema = [
      {
        name: 'name',
        displayName: '名称',
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
        endpoint={"services"}
      />
    )
  }
}

export default Service
