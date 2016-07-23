import React from 'react';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'

import lodash from 'lodash'
import call from '../../api'

class CreateService extends React.Component {

  static defaultFlow = ['开始', '就绪', '结束']

  submit() {
    const inputFlow = this.refs.flow.getValue()
    let flow = CreateService.defaultFlow
    if (inputFlow !== '') {
      const head = CreateService.defaultFlow.shift()
      flow = lodash.concat(head, inputFlow.split(','), CreateService.defaultFlow)
    }
    const name = this.refs.name.getValue()

    call('services', 'POST', {name, flow}).then((res) => {
      if (res) {
        window.location = '/#/services/list'
      }
    })
  }

  cancel() {
    window.location = '/#/services/list'
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
            ref="name"
          />
          <br />
          <TextField
            hintText="流程(多个流程以英文逗号分隔)"
            floatingLabelText="流程"
            ref="flow"
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
export default CreateService

