import React, {Component} from 'react'

import call from '../../../api'

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
        where: null,
        filter: null,
      }
    }

    componentDidMount() {
      this.fetch(null, this.props.filter)
    }

    componentWillReceiveProps(newProps) {
      if (this.state.where !== newProps.where ||
        this.state.filter !== newProps.filter
      ) {
        this.fetch(newProps.where, newProps.filter)
        this.setState({
          where: newProps.where,
          filter: newProps.filter,
        })
      }
    }

    fetch(where, filter) {
      const params = this.props.params

      let endpoint = params ?
        `${this.props.endpoint}?${filter}&${params}` :
        `${this.props.endpoint}?${filter}`
      endpoint = where ? `${endpoint}&filter[where]${where}` : endpoint

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

    create(item, success) {
      call(this.props.endpoint, 'POST', item).then(res => {
        if (res.status === 200) {
          this.fetch(null, this.props.filter)
          success()
        }
      })
    }

    delete(id, success) {
      call(`${this.props.endpoint}/${id}`, 'DELETE').then(res => {
        if (res.status === 200) {
          this.fetch(null, this.props.filter)
          success()
        }
      })
    }

    update(id, item, success) {
      call(`${this.props.endpoint}/${id}`, 'PUT', item).then(res => {
        if (res.status === 200) {
          this.fetch(null, this.props.filter)
          success()
        }
      })
    }

    render() {
      return <ComposedComponent
        {...this.props}
        items={this.state.items}
        total={this.state.total}
        create={::this.create}
        delete={::this.delete}
        update={::this.update}
      />
    }
  }
}

export default Restful
