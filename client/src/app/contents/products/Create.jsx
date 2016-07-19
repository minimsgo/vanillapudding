import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import callApi from '../../../middlewares/api'

class CreateProduct extends React.Component {
  
  constructor(){
    super()
    this.state = {
      item: {},
      services: [],
      selectedServiceId: '',
    }
  }

  componentWillMount(){
    callApi('services', 'GET').then((res) => {
      this.setState({
        services: res,
      })
    })
  }

  submit() {
    const product = {
      serviceId: this.state.selectedServiceId,
      type: this.refs.type.getValue(),
      price: this.refs.price.getValue(),
    }
    callApi('products', 'POST', product).then((res) => {
      if (res) {
        window.location = '/#/products/list'
      }
    })
  }

  cancel() {
    window.location = '/#/products/list'
  }

  render() {
    const actionBarStyle = {
      backgroundColor: 'white',
    }
    const actionStyle = {
      marginLeft: -10,
    }
   
    return (
      <div>
        <div>
          <SelectField
            hintText="服务项目"
            value={this.state.selectedServiceId}
            onChange={(event, index, value) => {
              this.setState({
                selectedServiceId: value, 
              })
            }}
          >
            {this.state.services.map((item, index) =>
              <MenuItem
                key={index}
                value={item.id}
                primaryText={item.name}
              />
            )}
          </SelectField>
          <br />
          
          <TextField
            hintText="衣物类型"
            floatingLabelText="衣物类型"
            ref="type"
          />
          <br />
          <TextField
            hintText="价格"
            floatingLabelText="价格"
            ref="price"
          />
          <br />
          
        </div>
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup float="left">
            <RaisedButton
              style={actionStyle}
              label="取消"
              onTouchTap={this.cancel}
            />
            <RaisedButton
              label="确认"
              style={actionStyle}
              onTouchTap={::this.submit}
              primary
            />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}
export default CreateProduct;

