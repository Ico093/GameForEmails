import React, {Component} from 'react'
import MenuItem from 'material-ui/MenuItem'

class CompanyMenuItem extends Component {
  render() {
    return (
      <MenuItem {...this.props} />
    )
  }
}

CompanyMenuItem.muiName = 'MenuItem';

export default CompanyMenuItem;