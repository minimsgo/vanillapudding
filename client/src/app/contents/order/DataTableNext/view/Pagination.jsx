import React from 'react'
import FlatButton from 'material-ui/FlatButton'

class Pagination extends React.Component {

  static propTypes = {
    prev: React.PropTypes.func,
    next: React.PropTypes.func,
    page: React.PropTypes.number,
    total: React.PropTypes.number,
  }

  render() {
    return (
      <div>
        <FlatButton
          onTouchTap={this.props.prev}
          disabled={this.props.page === 1}
          label="上一页"
        />
        <FlatButton
          onTouchTap={this.props.next}
          disabled={
            this.props.page === this.props.total ||
              this.props.total === 0
          }
          label="下一页"
        />
        <span>
          {
            this.props.total !== 0 ?
              `${this.props.page} / ${this.props.total}` : ''
          }
          </span>
      </div>
    )
  }
}

export default Pagination
