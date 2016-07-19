import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'

import call from '../../api'
import store from '../../store'

class EditService extends React.Component {

  constructor() {
    super()
    this.state = {
      item: {},
    }
  }

  componentWillMount() {
    const item = store.selection
    if (item) {
      this.setState({
        item,
      })
    } else {
      window.location = '/#/services/list'
    }
  }

  submit() {
    const formatItem = this.state.item
    formatItem.flow = JSON.parse(formatItem.flow)
    call(`services/${this.state.item.id}`, 
      'PUT', formatItem).then((res) => {
      if (res) {
        window.location = '/#/services/list'
      }
    })
  }

  deleteItem() {
    call(`services/${this.state.item.id}`, 'DELETE')
      .then((res) => {
      if (res) {
        window.location = '/#/services/list'
      }
    })
  }

  cancel() {
    window.location = '/#/services/list'
  }

  handleNameChange(event, value) {
    this.setState({
      item: {
        name: value,
        flow: this.state.item.flow,
        id: this.state.item.id,
      },
    })
  }

  handleFlowChange(event, value) {
    this.setState({
      item: {
        id: this.state.item.id,
        name: this.state.item.name,
        flow: value 
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
          <TextField
            hintText="名称"
            floatingLabelText="名称"
            value={this.state.item.name}
            onChange={::this.handleNameChange}
          />
          <br />
          <TextField
            hintText="流程"
            floatingLabelText="流程"
            value={this.state.item.flow}
            onChange={::this.handleFlowChange}
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
export default EditService;

