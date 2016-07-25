import React, { Component } from 'react'

function Pageable(ComposedComponent) {
  return class extends Component {

    static propTypes = {
      perPage: React.PropTypes.number,
    }

    constructor() {
      super()
      this.state = {
        page: 1,
      }
    }

    next() {
      this.setState({ page: this.state.page + 1})
    }

    prev() {
      this.setState({ page: this.state.page - 1})
    }

    render() {
      const limit = this.props.perPage
      const skip = (this.state.page - 1) * limit
      const filter = `filter[skip]=${skip}&filter[limit]=${limit}`

      return <ComposedComponent
        {...this.props}
        page={this.state.page}
        next={::this.next}
        prev={::this.prev}
        filter={filter}
      />
    }
  }
}

export default Pageable
