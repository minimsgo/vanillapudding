import React from 'react'

import DataList from './DataList.jsx'
import Form from './form/Form.jsx'
import ActionBar from './ActionBar.jsx'

import call from '../../api'

var selection = []

class DataTable extends React.Component {

  static propTypes = {
    schema: React.PropTypes.array,
    endpoint: React.PropTypes.string,
  }

  constructor() {
    super()
    this.state = {
      items: [],
      open: false,
      selection: [],
    }
  }

  fetch() {
    call(this.props.endpoint, 'GET').then(res => {
      if (res.status !== 200) return
      res.json().then(items => {
        this.setState({items})
      })
    })
  }

  open() {
    this.setState({
      open: true
    })
  }

  close() {
    this.setState({ open: false })
  }

  submit(item) {
    call(this.props.endpoint, 'POST', item).then(res => {
      if(res.status === 200){
        this.setState({
          open: false,
        })
        this.fetch()
      }
    })
  }

  componentDidMount() {
    this.fetch()
  }

  select(rows) {
    this.setState({
      selection: rows
    })
    selection = rows
  }

  render() {
    const item = selection.length > 0 ?
      this.state.items[selection[0]]: null
    return (
      <div>
        <ActionBar
          create={this.open.bind(this)}
          detail={this.open.bind(this)}
          show={this.state.selection.length > 0}
        />
        <DataList
          schema={this.props.schema}
          items={this.state.items}
          select={::this.select}
          selection={this.state.selection}
        />
        <Form
          title="新建"
          schema={this.props.schema}
          open={this.state.open}
          submit={this.submit.bind(this)}
          close={::this.close}
          item={item}
        />
      </div>
    )
  }
}

export default DataTable
