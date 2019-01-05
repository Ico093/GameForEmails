import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export default ({ results, selectedResults, onRowSelection, isSelected }) => {
    return (
        <div>
            <Table
                selectable={true}
                multiSelectable={true}
                onRowSelection={onRowSelection}>
                <TableHeader
                    displaySelectAll={true}
                    adjustForCheckbox={true}
                    enableSelectAll={true}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                        <TableHeaderColumn>Score</TableHeaderColumn>
                        <TableHeaderColumn>Time</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={true}
                    deselectOnClickaway={false}
                    showRowHover={true}>
                    {results.map((result, index) => {
                        const minutes = Math.floor(result.seconds / 60);
                        const seconds = result.seconds % 60;

                        return (
                            <TableRow key={result.email} selected={isSelected(index)}>
                                <TableRowColumn>{result.name}</TableRowColumn>
                                <TableRowColumn>{result.email}</TableRowColumn>
                                <TableRowColumn>{result.score}</TableRowColumn>
                                <TableRowColumn>{`${minutes}min : ${seconds}sec`}</TableRowColumn>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>


        </div>
    )
}