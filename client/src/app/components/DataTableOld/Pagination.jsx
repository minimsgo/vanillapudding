import React from 'react'
import FlatButton from 'material-ui/FlatButton'

class Pagination extends React.Component {
  static propTypes = {
    showPrev: React.PropTypes.bool,
    showNext: React.PropTypes.bool,
    prev: React.PropTypes.func,
    next: React.PropTypes.func,
  }
  render() {
    return (
      <div>
        <FlatButton
          disabled={!this.props.showPrev}
          onTouchTap={this.props.prev}
          label="上一页"
        />
        <FlatButton
          disabled={!this.props.showNext}
          onTouchTap={this.props.next}
          label="下一页"
        />
        <span>{this.props.current}</span>
      </div>
    )
  }
}

export default Pagination
