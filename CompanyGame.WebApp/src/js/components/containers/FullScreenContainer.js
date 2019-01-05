import React, { Component } from 'react'
import PropTypes from 'prop-types';

class FullScreenContainer extends Component {
    constructor(state, props, pena) {
        super(state, props);
        console.log(state)
        console.log(props)
        console.log(pena)
    }

    render() {
        return (
            <div>{props.page}</div>
        )
    }
}

FullScreenContainer.propTypes = {
    page: PropTypes.object
}

export default FullScreenContainer;