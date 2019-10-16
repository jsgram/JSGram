import React, { ReactElement } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './store/reducers';
import { Provider } from 'react-redux';
import { routes } from './routes';
import { Footer } from './components/Footer';
import AlertContainer from './containers/AlertContainer';
import Interactor from './lib/interactor';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/style.scss';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const App: React.FC = (): ReactElement => {
    new Interactor({ // tslint:disable-line no-unused-expression
        endpoint: `${process.env.REACT_APP_BASE_API}/interaction`,
        interactionElement: 'interaction',
        debug: false,
        async: false,
    });

    return (
        <Provider store={store}>
            <AlertContainer/>
            {routes}
            <Footer/>
        </Provider>
    );
};

export default App;
