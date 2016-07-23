import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import call from '../../api'
import store from '../../store'

class WorkDetail extends React.Component {

  constructor() {
    super()
    this.state = {
      wearType: '',
      price: 0,
      services: [],
      id: '',
      selected: null,
    }
  }

  componentDidMount() {
    const item = store.selection
    if (item) {
      this.setState({
        selected: item.service.id,
        wearType: item.wearType,
        price: item.price,
        id: item.id,
      })
      call('services', 'GET').then(res => {
        res.json().then(data => {
          this.setState({
            services: data
          })
        })
      })
    } else {
      window.location = '/#/works/list'
    }
  }

  submit() {
    const work = {
      serviceId: this.state.selected,
      wearType: this.state.wearType,
      price: this.state.price,
    }
    call(`works/${this.state.id}`, 'PUT', work).then((res) => {
      if (res.status === 200) {
        window.location = '/#/works/list'
      }
    })
  }

  deleteItem() {
    call(`works/${this.state.id}`, 'DELETE')
      .then(res => {
        if (res) {
          window.location = '/#/works/list'
        }
      })
  }

  cancel() {
    window.location = '/#/works/list'
  }

  selectService(event, index, value) {
    this.setState({
      selected: value
    })
  }

  handleWearTypeChange(event, value) {
    this.setState({
      wearType: value,
    })
  }

  handlePriceChange(event, value) {
    this.setState({
      price: value,
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
            value={this.state.selected}
            onChange={::this.selectService}
            floatingLabelText="服务项目"
          >
            {this.state.services.map((service, index) =>
              <MenuItem
                key={index}
                value={service.id}
                primaryText={service.name}
              />
            )}
          </SelectField>
          <br/>
          <TextField
            hintText="衣物类型"
            floatingLabelText="衣物类型"
            onChange={::this.handleWearTypeChange}
            value={this.state.wearType}
          />
          <br />
          <TextField
            hintText="价格"
            floatingLabelText="价格"
            onChange={::this.handlePriceChange}
            value={this.state.price}
          />
          <br />
        </div>
        <br />
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup>
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
export default WorkDetail;

