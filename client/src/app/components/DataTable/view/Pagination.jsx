import React from 'react'
import FlatButton from 'material-ui/FlatButton'

class Pagination extends React.Component {

  static propTypes = {
    showPrev: React.PropTypes.bool,
    showNext: React.PropTypes.bool,
    prevPage: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    page: React.PropTypes.number,
    total: React.PropTypes.number,
  }

  render() {
    return (
      <div>
        <FlatButton
          onTouchTap={this.props.prevPage}
          disabled={!this.props.showPrev}
          label="上一页"
        />
        <FlatButton
          onTouchTap={this.props.nextPage}
          disabled={!this.props.showNext}
          label="下一页"
        />
        <span>{this.props.page} / {this.props.total}</span>
      </div>
    )
  }
}

export default Pagination
