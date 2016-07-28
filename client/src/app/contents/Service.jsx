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
        name: 'type',
        displayName: '类型',
        type: 'string',
      },
      {
        name: 'wear',
        displayName: '衣物',
        type: 'string',
      },
      {
        name: 'price',
        displayName: '价格',
        type: 'number',
      },
    ]

    return (
      <div>
        <DataTable
          schema={schema}
          endpoint={"services"}
          perPage={8}
          params={null}
        />
      </div>
    )
  }
}

export default Service
