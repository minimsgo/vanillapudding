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
    open: React.PropTypes.func,
    showDetail: React.PropTypes.bool,
    detail: React.PropTypes.func,
    schema: React.PropTypes.array,
    searchField: React.PropTypes.string,
    searchable: React.PropTypes.array,
    searchKeyword: React.PropTypes.string,
    handleSearchFieldChange: React.PropTypes.func,
    handleSearchKeywordChange: React.PropTypes.func,
  }

  constructor() {
    super()
    this.state = {
      keyword: ''
    }
  }

  onChange(event, value) {
    this.setState({
      keyword: value
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

    return (
      <Toolbar style={style.toolbar}>
        <ToolbarGroup >
          <SearchIcon
            style={style.icon}
          />
          <SelectField
            style={style.search.field}
            value={this.props.searchField}
            onChange={this.props.handleSearchFieldChange}
          >
            {this.props.searchable.map((field, index) =>
              <MenuItem
                key={index}
                value={field.name}
                primaryText={field.displayName}
              />
            )}
          </SelectField>
          <TextField
            value={this.props.searchKeyword}
            style={style.search.keyword}
            onChange={this.props.handleSearchKeywordChange}
            hintText="搜索"
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label={this.props.showDetail ? "详细信息" : "新建"}
            onTouchTap={this.props.open}
            primary
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default ActionBar

