import React from 'react'
import SvgIcon from 'material-ui/SvgIcon'

class TrendingFlat extends React.Component {

  render(){
    return (
      <SvgIcon {...this.props}>
        <svg fill="#000000" height="48" viewBox="0 0 24 24" width="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12l-4-4v3H3v2h15v3z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </SvgIcon>
    )
  }
}

export default TrendingFlat 
