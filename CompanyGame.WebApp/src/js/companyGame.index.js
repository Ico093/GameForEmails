import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

// Store
import { Provider } from 'react-redux';
import store from './store/store';

// Styles CSS
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CompanyTheme from './components/common/themes/CompanyTheme.js';

// import '../../node_modules/materialize-css/dist/css/materialize.min.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../css/CompanyGame.scss'

// Styles Javascript
import '../../node_modules/jquery/dist/jquery.min.js';
import '../../node_modules/materialize-css/dist/js/materialize.min.js';

//Fonts
import '../../node_modules/font-awesome/fonts/fontawesome-webfont.eot';
import '../../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import '../../node_modules/font-awesome/fonts/fontawesome-webfont.ttf';
import '../../node_modules/font-awesome/fonts/fontawesome-webfont.woff';
import '../../node_modules/font-awesome/fonts/fontawesome-webfont.woff2';

// Main application code
import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider muiTheme={getMuiTheme(CompanyTheme)}>
        <Provider store={store}>
          <Component />
        </Provider>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app')
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
