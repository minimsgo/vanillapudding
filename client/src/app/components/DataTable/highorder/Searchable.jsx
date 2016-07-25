import React, {Component} from 'react'

function Searchable(ComposedComponent) {
  return class extends Component {

    constructor() {
      super()
      this.state = {
        where: '',
      }
    }

    setWhere(where) {
      this.setState({where})
    }

    render() {
      return <ComposedComponent
        {...this.props}
        where={this.state.where}
        setWhere={::this.setWhere}
      />
    }
  }
}

export default Searchable
