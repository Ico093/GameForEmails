import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as resultsActions from '../../../../actions/resultsActions';

import CompanyRaisedButton from '../../../common/CompanyRaisedButton';
import ResultsTable from './ResultsTable';

class ManageResultsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedResults: [],
        };

        this.onRowSelection = this.onRowSelection.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.onDeleteClicked = this.onDeleteClicked.bind(this);
    }

    componentWillMount() {
        this.props.resultsActions.getResults();
    }

    onRowSelection(selectedRows) {
        this.setState({
            selectedResults: selectedRows
        });
    }

    isSelected(index) {
        return this.state.selectedResults.indexOf(index) !== -1;
    };

    onDeleteClicked() {
        const selectedResults = this.state.selectedResults.map((item, index) => {
            return this.props.state.results[item].email;
        })

        this.props.resultsActions.deleteResults(selectedResults).then(() => {
            this.setState({
                selectedResults: []
            });
        });
    }

    render() {
        if (this.props.state.results.lengTableHeaderColumn === 0) {
            return (<div></div>)
        }

        return (
            <div>
                <ResultsTable
                    results={this.props.state.results}
                    onRowSelection={this.onRowSelection}
                    isSelected={this.isSelected} />

                <CompanyRaisedButton
                    label='Delete'
                    secondary={true}
                    onClick={this.onDeleteClicked}
                    style={this.state.selectedResults.length !== 0 ? {} : { display: 'none' }}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        state: {
            results: state.results
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resultsActions: bindActionCreators(resultsActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageResultsPage);