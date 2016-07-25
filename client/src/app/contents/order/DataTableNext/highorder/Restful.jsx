import React, { Component } from 'react'

import call from '../../../../api'

function Restful(ComposedComponent) {
  return class extends Component {

    static propTypes = {
      schema: React.PropTypes.array,
      endpoint: React.PropTypes.string,
      params: React.PropTypes.string,
      page: React.PropTypes.number,
      perPage: React.PropTypes.number,
      filter: React.PropTypes.string,
    }

    constructor() {
      super()
      this.state = {
        items: [],
        total: 0,
      }
    }

    componentDidMount() {
      this.fetch(null, this.props.filter)
    }

    componentWillReceiveProps(newProps) {
      this.fetch(newProps.where, newProps.filter)
    }

    fetch(where, filter) {
      const params = this.props.params

      let endpoint = params ?
        `${this.props.endpoint}?${filter}&${params}` :
        `${this.props.endpoint}?${filter}`
      endpoint = where ? `${endpoint}&filter[where]${where}`: endpoint

      call(endpoint, 'GET').then(res => {
        if (res.status === 200) {
          res.json().then(items => {
            this.setState({items})
          })
        }
      })

      this.count(where)
    }

    count(where) {
      const endpoint = where ?
        `${this.props.endpoint}/count?[where]${where}` :
        `${this.props.endpoint}/count`
      call(endpoint, 'GET').then(res => {
        if (res.status !== 200) return
        res.json().then(countObject => {
          const count = countObject.count

          const perPage = this.props.perPage
          const total = count % perPage == 0 ?
          count / perPage : Math.floor(count / perPage) + 1

          this.setState({total})
        })
      })
    }

    render() {
      return <ComposedComponent
        {...this.props}
        items={this.state.items}
        total={this.state.total}
      />
    }
  }
}

export default Restful
