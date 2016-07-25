import React from 'react'
import DataTable from '../components/DataTable/DataTable.jsx'

class Holder extends React.Component {

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
      },
    ]

    return (
      <DataTable
        schema={schema}
        endpoint={"holders"}
        perPage={8}
        params={null}
      />
    )
  }
}

export default Holder
