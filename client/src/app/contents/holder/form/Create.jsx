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
    create: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      types: [],
      selectedType: ''
    }
  }

  componentDidMount() {
    call('services?', 'GET').then(res => {
      res.json().then(services => {
        this.setState({
          types: lodash.uniq(services.map(service => service.type))
        })
      })
    })
  }

  create() {
    const holder = {
      codeRangeEnd: this.refs.codeRangeEnd.getValue(),
      type: this.state.selectedType,
    }
    call('holders/createMany', 'POST', holder).then(
      res => {
        if (res.status === 200) this.props.hide()
      }
    )
  }

  handleTypeChange(event, index, value) {
    this.setState({selectedType: value})
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
        onTouchTap={::this.create}
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
          hintText="编号"
          floatingLabelText="编号"
          ref="codeRangeEnd"
        />
        <br/>
        <SelectField
          hintText="类型"
          floatingLabelText="类型"
          onChange={::this.handleTypeChange}
          value={this.state.selectedType}
        >
          {
            this.state.types.map((type, index) =>
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
