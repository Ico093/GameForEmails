import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';

class CompanySelectField extends Component {
    constructor(props) {
        super(props);

        this.selectOnChange = this.selectOnChange.bind(this);
    }

    selectOnChange(event, index, value) {
        event.target = {};
        event.target.name = this.props.name;
        event.target.value = value;
        this.props.onChange(event);
    }

    render() {
        return (
            <SelectField
                id={this.props.id}
                fullWidth={this.props.fullWidth}
                value={this.props.value}
                floatingLabelText={this.props.floatingLabelText}
                onChange={this.selectOnChange}>
                {this.props.children}
            </SelectField >
        )
    }
}

export default CompanySelectField;