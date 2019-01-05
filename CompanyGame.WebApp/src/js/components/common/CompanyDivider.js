import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

class CompanyDivider extends Component {
    render() {
        let styleObject = Object.assign({
            padding: "30px"
        }, this.props.style)

        return (
            <Divider/>
        );
    }
}

export default CompanyDivider;