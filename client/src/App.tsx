import React, { ReactElement } from 'react';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';
import { Provider } from 'react-redux';
import { routes } from './routes';
import { Footer } from './components/Footer';
import {Post} from './components/Post';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import AlertContainer from './containers/AlertContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const App: React.FC = (): ReactElement => {
    return (
        <Provider store={store}>
            <AlertContainer/>
            {routes}
            <Footer/>
        </Provider>
    );
};

export default App;
