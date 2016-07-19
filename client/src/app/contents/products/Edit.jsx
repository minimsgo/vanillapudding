import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import callApi from '../../../middlewares/api'
import store from '../../../store'

class EditProduct extends React.Component {

  constructor() {
    super()
    this.state = {
      item: {},
      services: [],
      serviceId: '',
    }
  }

  componentWillMount() {
    const item = store.selection
    if (item) {
      this.setState({
        item,
        serviceId: item.serviceId,
      })

      callApi('services', 'GET').then((res) => {
        this.setState({
          services: res,
        })
      })
    } else {
      window.location = '/#/products/list'
    }
  }

  submit() {
    const formatItem = this.state.item
    formatItem.serviceId = this.state.serviceId
    callApi(`products/${this.state.item.id}`,
      'PUT', formatItem).then((res) => {
      if (res) {
        window.location = '/#/products/list'
      }
    })
  }

  deleteItem() {
    callApi(`products/${this.state.item.id}`, 'DELETE')
      .then((res) => {
        if (res) {
          window.location = '/#/products/list'
        }
      })
  }

  cancel() {
    window.location = '/#/products/list'
  }

  handleTypeChange(event, value) {
    this.setState({
      item: {
        type: value,
        price: this.state.item.price,
        id: this.state.item.id,
      },
    })
  }

  handlePriceChange(event, value) {
    this.setState({
      item: {
        type: this.state.item.type,
        price: value,
        id: this.state.item.id,
      },
    })
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
            value={this.state.serviceId}
            onChange={(event, index, value) => {
              this.setState({
                serviceId: value,
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
          <br/>
          <TextField
            hintText="衣物类型"
            floatingLabelText="衣物类型"
            value={this.state.item.type}
            onChange={::this.handleTypeChange}
          />
          <br />
          <TextField
            hintText="价格"
            floatingLabelText="价格"
            value={this.state.item.price}
            onChange={::this.handlePriceChange}
          />
          <br />
        </div>
        <br />
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup float="left">
            <RaisedButton
              style={actionStyle}
              label="取消"
              onTouchTap={this.cancel}
            />
            <RaisedButton
              style={actionStyle}
              label="删除"
              secondary
              onTouchTap={::this.deleteItem}
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
export default EditProduct;
