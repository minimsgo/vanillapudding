import React, {Component} from 'react'


function Editable(ComposedComponent) {

  // 解决material ui table 失去焦点后无法保存已选择的 row
  var selectedItem = null

  return class extends Component {

    constructor() {
      super()
      this.state = {
        open: false,
        selectedRow: -1,
      }
    }

    show() {
      this.setState({open: true})
    }

    hide() {
      this.setState({open: false})
    }

    select(item, row) {
      this.setState(
        {selectedRow: row}
      )
      selectedItem = item
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          open={this.state.open}
          show={::this.show}
          hide={::this.hide}
          select={::this.select}
          selectedItem={selectedItem}
          selectedRow={this.state.selectedRow}
        />
      )
    }
  }
}

export default Editable
