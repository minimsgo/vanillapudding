import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import BarcodeReader from '../../components/BarcodeReader.jsx'

import Detail from './Detail.jsx'

import call from '../../api'

class Query extends Component {

  constructor() {
    super()
    this.state = {
      barcode: '',
      open: false,
      wear: {
        order: {},
      },
    }
  }

  componentDidMount() {
    this.handleDetected('31738282461')
  }

  hide() {
    this.setState({
      open: false,
    })
  }

  handleDetected(barcode) {
    this.setState({ barcode })
    const endpoint =
      `wears?filter[include][order]&filter[where][barcode]=${barcode}`
    call(endpoint, 'GET').then(res => {
      res.json().then(wears => {
        this.setState({
          wear: wears[0],
          open: true
        })
      })
    })
  }

  render() {
    return (
      <div>
        <TextField
          value={this.state.barcode}
          floatingLabelText="条形码"
        />
        <BarcodeReader
          handleDetected={::this.handleDetected}
        />
        <Detail
          open={this.state.open}
          hide={::this.hide}
          wear={this.state.wear}
        />
      </div>

    )
  }
}

export default Query
