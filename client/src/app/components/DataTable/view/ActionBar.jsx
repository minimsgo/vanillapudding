import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui/svg-icons/action/search'

class ActionBar extends React.Component {

  static propTypes = {
    showDetail: React.PropTypes.bool,
    schema: React.PropTypes.array,
    setWhere: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      field: '',
      keyword: '',
      timer: null,
    }
  }

  componentDidMount() {
    this.setState({
      field: this.genSearchable()[0].name
    })
  }

  fieldChange(event, index, value) {
    this.setState({
      field: value,
      keyword: '',
    })
    this.props.setWhere(null)
  }

  keywordChange(event, value) {
    if (this.state.timer) {
      clearTimeout(this.state.timer)
    }
    const oldValue = this.state.keyword
    let timer = null
    if (value !== oldValue) {
      timer = setTimeout(() => {
        this.props.setWhere(
          this.genWhere(this.state.field, value)
        )
      }, 1000)
    }
    this.setState({keyword: value, timer})
  }

  genSearchable() {
    return this.props.schema.filter(field => {
        const searchableTypes = ['string', 'number', 'date']
        return searchableTypes.indexOf(field.type) !== -1
      }
    )
  }

  genWhere(field, keyword) {
    const type = this.props.schema.filter(
      s => s.name === field)[0].type

    let where = null
    if (keyword !== '') {
      switch (type) {
        case 'string':
          where = `[${field}][like]=%25${keyword}%25`
          break
        case 'number':
          where = `[${field}]=${keyword}`
          break
        default:
          break
      }
    }

    return where
  }

  render() {
    const style = {

      toolbar: {
        backgroundColor: 'white',
      },
      newItemButton: {
        marginRight: -24,
      },
      icon: {
        marginTop: 10,
        marginLeft: 0,
        width: 36,
        height: 36,
      },
      search: {
        field: {
          width: 120,
        },
        keyword: {
          marginTop: 0,
          marginLeft: 0,
          width: 150,
        },
      },
    }
    const searchable = this.genSearchable()
    return (
      <Toolbar style={style.toolbar}>
        <ToolbarGroup >
          <SearchIcon
            style={style.icon}
          />
          <SelectField
            style={style.search.field}
            value={this.state.field}
            onChange={::this.fieldChange}
          >
            {searchable.map((field, index) =>
              <MenuItem
                key={index}
                value={field.name}
                primaryText={field.displayName}
              />
            )}
          </SelectField>
          <TextField
            value={this.state.keyword}
            style={style.search.keyword}
            onChange={::this.keywordChange}
            hintText="搜索"
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label={this.props.showDetail ? "详细信息" : "新建"}
            primary
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default ActionBar

