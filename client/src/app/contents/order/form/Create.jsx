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
      orderedServices: [],
      selectedServiceName: '',
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
      orderedServices: this.state.orderedServices,
    }

    call('orders/createWithServices', 'POST', order).then(
      res => {
        if (res.status === 200) this.props.hide()
      }
    )
  }

  handleServiceChange(event, index, value) {
    this.setState({selectedServiceName: value})
  }

  handleWearTypeChange(event, index, value) {
    const selectedService = this.state.services.filter(
      service => service.id === value
    )[0]
    let orderedServices = this.state.orderedServices
    orderedServices.push(selectedService)
    this.setState({orderedServices})
  }

  render() {
    const contentStyle = {
      width: '100%',
      maxWidth: 'none',
    }
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

    const serviceNames = lodash.uniq(
      this.state.services.map(service => service.name)
    )
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
            value={
              this.state.orderedServices.map(
                service => service.price
              ).reduce(lodash.add, 0)
            }
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>
                <SelectField
                  hintText="服务项目"
                  value={this.state.selectedServiceName}
                  onChange={::this.handleServiceChange}
                >
                  { serviceNames.map((name, index) =>
                    <MenuItem
                      key={index}
                      value={name}
                      primaryText={name}
                    />
                  )}
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  hintText="衣物类型"
                  onChange={::this.handleWearTypeChange}
                >
                  {
                    this.state.services.filter(
                      service => service.name === this.state.selectedServiceName
                    ).map((service, index) =>
                      <MenuItem
                        key={index}
                        value={service.id}
                        primaryText={service.wearType}
                      />
                    )
                  }

                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn>价格</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.state.orderedServices.map((service, index) =>
                <TableRow key={index}>
                  <TableRowColumn>
                    {service.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {service.wearType}
                  </TableRowColumn>
                  <TableRowColumn>
                    {service.price}
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
