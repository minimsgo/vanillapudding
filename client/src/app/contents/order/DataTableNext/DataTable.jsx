import React, { Component } from 'react'

import DataList from './view/DataList.jsx'
import ActionBar from './view/ActionBar.jsx'
import Pagination from './view/Pagination.jsx'
import Restful from './highorder/Restful.jsx'
import Pageable from './highorder/Pageable.jsx'
import Searchable from './highorder/Searchable.jsx'


class View extends Component {

  static propTypes = {
    schema: React.PropTypes.array,
    items: React.PropTypes.array,
    showDetail: React.PropTypes.bool,

    page: React.PropTypes.number,
    next: React.PropTypes.func,
    prev: React.PropTypes.func,

    setWhere: React.PropTypes.func,
  }

  render() {
    return (
      <div>
        <ActionBar
          showDetail={this.props.showDetail}
          schema={this.props.schema}
          setWhere={this.props.setWhere}
        />
        <DataList
          schema={this.props.schema}
          items={this.props.items}
        />
        <Pagination
          page={this.props.page}
          total={this.props.total}
          next={this.props.next}
          prev={this.props.prev}
        />
      </div>
    )
  }
}

export default Searchable(Pageable(Restful(View)))
