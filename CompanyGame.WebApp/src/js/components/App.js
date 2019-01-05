import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppRouter from './Routes/AppRouter';

class App extends Component {
    componentWillMount() {
        injectTapEventPlugin();
    }

    render() {
        return (
            <AppRouter />
        )
    }
}

export default App