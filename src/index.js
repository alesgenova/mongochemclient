import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'
import App from './components/app';
import MoleculeContainer from './containers/molecule';
import CalculationContainer from './containers/calculation';
import {VibrationalModesChartContainer, FreeEnergyChartContainer} from './containers/charts';
import './index.css';
import configureStore from './store/configureStore'
import rootSaga from './sagas'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore()
store.runSaga(rootSaga)


// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <ConnectedRouter history={store.history}>
        <div>
          <Route exact path='/' component={App}/>
          <Route exact path='/molecules/:id' component={MoleculeContainer}/>
          <Route exact path='/molecules/inchikey/:inchikey' component={MoleculeContainer}/>
          <Route exact path='/chart' component={VibrationalModesChartContainer}/>
          <Route exact path='/freechart' component={FreeEnergyChartContainer}/>
          <Route path='/calculations/:id' component={CalculationContainer}/>
        </div>
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
