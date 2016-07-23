import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import lodash from 'lodash'
import call from '../../api'

class CreateWork extends React.Component {

  constructor() {
    super()
    this.state = {
      services: [],
      selected: null,
    }
  }

  componentDidMount() {
    call('services', 'GET').then(res => {
      res.json().then(data => {
        this.setState({
          services: data
        })
      })
    })
  }

  submit() {
    const wearType = this.refs.wearType.getValue()
    const price = this.refs.price.getValue()
    const serviceId = this.state.selected

    call('works', 'POST', {serviceId, wearType, price}).then(res => {
      if (res.status === 200) {
        window.location = '#/works/list'
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
            ref="wearType"
          />
          <br/>
          <TextField
            hintText="价格"
            floatingLabelText="价格"
            ref="price"
          />
        </div>
        <Toolbar style={actionBarStyle}>
          <ToolbarGroup>
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
    )
  }
}
export default CreateWork

