import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import lodash from 'lodash'
import call from '../../../api'

class Create extends Component {

  static propTypes = {
    schema: React.PropTypes.array,
    title: React.PropTypes.string,
    open: React.PropTypes.bool,
    hide: React.PropTypes.func,
    item: React.PropTypes.object,
  }

  constructor() {
    super()
    this.state = {
      holder: {},
    }
  }

  componentDidMount() {
    this.setState({ holder: this.props.item })
  }


  submit() {
    const holder = this.state.holder
    call(`holders/${holder.id}`, 'PUT', holder).then(
      res => {
        if (res.status === 200) this.props.hide()
      }
    )
  }

  handleStateChange(event, index, value) {
    let holder = this.state.holder
    holder.state = value
    this.setState({ holder })
  }

  render() {

    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={this.props.hide}
      />,
      <FlatButton
        label="确认"
        primary={true}
        onTouchTap={::this.submit}
      />,
    ]

    return (
      <Dialog
        title={this.props.title}
        modal={false}
        actions={actions}
        open={this.props.open}
        autoScrollBodyContent={true}>
        <TextField
          floatingLabelText="编号"
          value={this.state.holder.code}
          disabled
        />
        <br/>
        <TextField
          floatingLabelText="类型"
          value={this.state.holder.type}
          disabled
        />
        <br/>
        <SelectField
          floatingLabelText="状态"
          onChange={::this.handleStateChange}
          value={this.state.holder.state}
          disabled={this.state.holder.state === '已用'}
        >
          {
            ['可用', '已用', '不可用'].map((type, index) =>
              <MenuItem
                key={index}
                value={type}
                primaryText={type}
              />
            )
          }
        </SelectField>
      </Dialog>
    )
  }
}

export default Create
