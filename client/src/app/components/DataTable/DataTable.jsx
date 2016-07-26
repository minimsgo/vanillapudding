import React, { Component } from 'react'

import DataList from './view/DataList.jsx'
import ActionBar from './view/ActionBar.jsx'
import Pagination from './view/Pagination.jsx'
import Form from './form/Form.jsx'
import Restful from './highorder/Restful.jsx'
import Pageable from './highorder/Pageable.jsx'
import Searchable from './highorder/Searchable.jsx'
import Editable from './highorder/Editable.jsx'


class View extends Component {

  static propTypes = {
    schema: React.PropTypes.array,
    items: React.PropTypes.array,

    page: React.PropTypes.number,
    next: React.PropTypes.func,
    prev: React.PropTypes.func,
    resetPage: React.PropTypes.func,

    setWhere: React.PropTypes.func,

    open: React.PropTypes.bool,
    show: React.PropTypes.func,
    hide: React.PropTypes.func,

    select: React.PropTypes.func,
    selectedRow: React.PropTypes.number,
    selectedItem: React.PropTypes.object,

    create: React.PropTypes.func,
    update: React.PropTypes.func,
    delete: React.PropTypes.func,
  }

  render() {
    const edit = this.props.selectedRow !== -1
    return (
      <div>
        <ActionBar
          edit={edit}
          schema={this.props.schema}
          setWhere={this.props.setWhere}
          resetPage={this.props.resetPage}
          show={this.props.show}
        />
        <DataList
          schema={this.props.schema}
          items={this.props.items}
          select={this.props.select}
          selectedRow={this.props.selectedRow}
        />
        <Pagination
          page={this.props.page}
          total={this.props.total}
          next={this.props.next}
          prev={this.props.prev}
        />
        <Form
          open={this.props.open}
          edit={edit}
          selectedItem={this.props.selectedItem}
          schema={this.props.schema}
          hide={this.props.hide}
          create={this.props.create}
          update={this.props.update}
          delete={this.props.delete}
          title="新建"
        />
      </div>
    )
  }
}

export default Searchable(Pageable(Restful(Editable(View))))
