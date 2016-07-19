import React from 'react';
import BarcodeScanner from '../../components/BarcodeReader'
import TextField from 'material-ui/TextField'

import callApi from '../../../middlewares/api'
import store from '../../../store'

class Scanner extends React.Component {

  constructor() {
    super()
    this.state = {
      barcode: '',
    }
  }

  componentWillMount() {
    this.handleDetected({
      codeResult: {
        code: '1462609527374',
      },
    })
  }
 
  handleDetected(result) {
    const barcode = result.codeResult.code
    callApi(`order_items?barcode=${barcode}`, 'GET').then(res => {
      this.setState({ barcode })
      store.selection = res
      window.location = '/#/step/detail'
    })
  }


  render() {
    return (
      <div>
        <div>
          <TextField
            floatingLabelText="条形码"
            value={this.state.barcode}/>
        </div>
        <br/>
        
        <BarcodeScanner onDetected={::this.handleDetected}/> 
      </div>
    );
  }
}

export default Scanner;
