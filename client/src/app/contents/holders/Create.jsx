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


  submit() {
    const code = this.refs.code.getValue()
    const state = this.refs.state.getValue()

    call('holders', 'POST', {code, state}).then(res => {
      if (res.status === 200) {
        window.location = '#/holders/list'
      }
    })
  }

  cancel() {
    window.location = '/#/holders/list'
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
            hintText="编号"
            floatingLabelText="编号"
            ref="code"
          />
          <br/>
          <TextField
            hintText="状态"
            value="可用"
            floatingLabelText="状态"
            ref="state"
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

