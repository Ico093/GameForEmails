import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

class ExperainPaper extends Component {
    render() {
        let styleObject = Object.assign({
            padding: "30px"
        }, this.props.style)

        return (
            <Paper style={styleObject} className={this.props.className} >
                {this.props.children}
            </Paper>
        );
    }
}

export default ExperainPaper;