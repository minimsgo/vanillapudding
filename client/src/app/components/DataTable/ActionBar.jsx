import React from 'react'
import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'

import SearchIcon from '../Icons/SearchIcon'

export default class ActionBar extends React.Component {

  static propTypes = {
    showDetailButton: React.PropTypes.bool,
    toDetailPage: React.PropTypes.func,
    toCreatePage: React.PropTypes.func,
    searchableFields: React.PropTypes.array,
    searchField: React.PropTypes.string,
    searchKeyword: React.PropTypes.string,
    handleSearchFieldChange: React.PropTypes.func,
    handleSearchKeywordChange: React.PropTypes.func,
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
            value={this.props.searchField}
            style={style.query.field}
            onChange={this.props.handleSearchFieldChange}
          >
            {this.props.searchableFields.map((field, index) =>
              <MenuItem
                key={index}
                value={field.name}
                primaryText={field.displayName}
              />
            )}
          </SelectField>
          <TextField
            value={this.props.searchKeyword}
            style={style.query.keyword}
            onChange={this.props.handleSearchKeywordChange}
            hintText="搜索"
          />

        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            label="详细信息"
            disabled={!this.props.showDetailButton}
            onTouchTap={this.props.toDetailPage}
          />
          <RaisedButton
            label="新建"
            onTouchTap={this.props.toCreatePage}
            primary
          />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
