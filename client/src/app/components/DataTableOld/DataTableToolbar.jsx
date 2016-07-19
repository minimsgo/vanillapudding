import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

import lodash from 'lodash'

import SearchIcon from '../Icons/SearchIcon'

export default class DataTableToolbar extends React.Component {
  static delay = 1000
  static propTypes = {
    create: React.PropTypes.func,
    schema: React.PropTypes.array,
    search: React.PropTypes.func,
    showEditButton: React.PropTypes.bool,
    edit: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      query: {
        field: '',
        keyword: '',
      },
      timer: null,
      showEditButton: false,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.showEditButton !== this.state.showEditButton) {
      this.setState({
        showEditButton: newProps.showEditButton,
      })
    }
  }
  
  componentWillMount() {
    this.setState({
      query: {
        field: this.props.schema[0].name,
        keyword: '',
      },
      timer: null,
    })
  }
  
  onQueryFieldChange(event, index, value) {
    this.setState({
      query: {
        field: value,
        keyword: '',
      },
    })
  }

  queryFormat(query){
    const q = {}
    const type = lodash.find(
      this.props.schema, item => {
        return item.name === query.field
      }).type
    if (query.keyword !== '') {
      if (type === 'text') {
        q[query.field] = {
          '$like': `%25${query.keyword}%25`
        }
      } else {
        q[query.field] = {
          '$eq': query.keyword
        }
      }
    }
    return JSON.stringify(q)
  }

  onQueryKeywordChange(event, value) {
    clearTimeout(this.state.timer)
    const newQuery = {
      field: this.state.query.field,
      keyword: value,
    }

    const oldKeyword = this.state.query.keyword

    let timer = null
    if (value !== oldKeyword) {
      timer = setTimeout(() => {
        this.props.search(this.queryFormat(newQuery))
      }, DataTableToolbar.delay)
    }

    this.setState({
      query: newQuery,
      timer,
    })
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
      query: {
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
    
    return (
      
      <Toolbar style={style.toolbar}>
        <ToolbarGroup >
          <SearchIcon
            style={style.icon}
          />

          <SelectField
            value={this.state.query.field}
            style={style.query.field}
            onChange={::this.onQueryFieldChange}
          >
            {this.props.schema.map((field, index) =>
              <MenuItem
                key={index}
                value={field.name}
                primaryText={field.displayName}
              />
            )}
          </SelectField>
          <TextField
            value={this.state.query.keyword}
            style={style.query.keyword}
            hintText="搜索"
            onChange={::this.onQueryKeywordChange}
          />
          
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label="编辑"
            onTouchTap={this.props.edit}
            disabled={!this.state.showEditButton}
          />
          
          <RaisedButton
            label="新建"
            style={style.newItemButton}
            onClick={this.props.create}
            primary
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
