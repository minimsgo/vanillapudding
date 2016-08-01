import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Table from 'material-ui/Table/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow'
import TableHeader from 'material-ui/Table/TableHeader'
import TableRowColumn from 'material-ui/Table/TableRowColumn'
import TableBody from 'material-ui/Table/TableBody'
import Checkbox from 'material-ui/Checkbox'


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
      services: [],
      wears: [],
      serviceType: '',
      serviceName: '',
      hasStains: false,
      serviceWear: '',
    }
  }

  componentDidMount() {
    call('services?', 'GET').then(res => {
      res.json().then(services => {
        this.setState({services})
      })
    })
  }

  create() {
    const order = {
      customerTel: this.refs.customerTel.getValue(),
      customerName: this.refs.customerName.getValue(),
      wears: this.state.wears,
    }

    call('orders/createNew', 'POST', order).then(
      res => {
        if (res.status === 200) this.props.hide()
      }
    )
  }

  handleServiceTypeChange(event, index, value) {
    this.setState({serviceType: value})
  }

  handleServiceNameChange(event, index, value) {
    this.setState({serviceName: value})
  }

  handleHasStainsChecked(event, isInputChecked) {
    this.setState({hasStains: isInputChecked})
  }

  handleServiceWearChange(event, index, value) {
    this.setState({serviceWear: value})

    const selectedService = this.state.services.filter(
      service =>
      service.type === this.state.serviceType &&
      service.name === this.state.serviceName &&
      service.wear === value
    )[0]

    const wear = {
      service: selectedService,
      hasStains: this.state.hasStains
    }

    let wears = this.state.wears
    wears.push(wear)
    this.setState({
      wears,
      serviceType: '',
      serviceName: '',
      hasStains: false,
      serviceWear: '',
    })
  }

  close() {
    this.setState({wears: []})
    this.props.hide()
  }

  render() {
    const contentStyle = {
      width: '100%',
      maxWidth: 'none',
    }
    const actions = [
      <FlatButton
        label="取消"
        onTouchTap={::this.close}
      />,
      <FlatButton
        label="确认"
        primary={true}
        onTouchTap={::this.create}
      />,
    ]

    const serviceTypes = lodash.uniq(
      this.state.services.map(service => service.type)
    )

    const serviceNames = lodash.uniq(
      this.state.services.filter(
        service => service.type === this.state.serviceType
      ).map(service => service.name)
    )

    const serviceWears = lodash.uniq(
      this.state.services.filter(
        service => service.type === this.state.serviceType &&
        service.name === this.state.serviceName
      ).map(service => service.wear)
    )

    const amount =
      this.state.wears
        .map(wear => wear.service.price)
        .reduce(lodash.add, 0)

    return (
      <Dialog
        title={this.props.title}
        modal={false}
        actions={actions}
        open={this.props.open}
        contentStyle={contentStyle}
        autoScrollBodyContent={true}>

        <div>
          <TextField
            hintText="客户电话"
            floatingLabelText="客户电话"
            ref="customerTel"
          />
          <TextField
            hintText="客户姓名"
            floatingLabelText="客户姓名"
            ref="customerName"
          />
          <TextField
            hintText="金额"
            floatingLabelText="金额"
            disabled
            value={ amount }
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
                <SelectField
                  hintText="类型"
                  autoWidth
                  value={this.state.serviceType}
                  onChange={::this.handleServiceTypeChange}
                >
                  {
                    serviceTypes.map((serviceType, index) =>
                      <MenuItem
                        key={index}
                        value={serviceType}
                        primaryText={serviceType}
                      />
                    )
                  }
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  hintText="服务项目"
                  value={this.state.serviceName}
                  onChange={::this.handleServiceNameChange}
                >
                  {
                    serviceNames.map((serviceName, index) =>
                      <MenuItem
                        key={index}
                        value={serviceName}
                        primaryText={serviceName}
                      />
                    )
                  }
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <Checkbox
                  label="瑕疵"
                  checked={this.state.hasStains}
                  onCheck={::this.handleHasStainsChecked}
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  hintText="衣物"
                  value={this.state.serviceWear}
                  onChange={::this.handleServiceWearChange}
                >
                  {
                    serviceWears.map((serviceWear, index) =>
                      <MenuItem
                        key={index}
                        value={serviceWear}
                        primaryText={serviceWear}
                      />
                    )
                  }
                </SelectField>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.wears.map((wear, index) =>
                <TableRow key={index}>
                  <TableRowColumn>
                    {wear.service.type}
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.service.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="瑕疵"
                      checked={wear.hasStains}
                      disabled
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    {wear.service.wear}
                  </TableRowColumn>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </Dialog>
    )
  }
}

export default Create
