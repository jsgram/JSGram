import React, { ReactElement } from 'react';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers';
import { Provider } from 'react-redux';
import routes from './routes';
import { Footer } from './components/Footer/Footer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import AlertContainer from './components/Alert/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles/style.scss';
import 'font-awesome/css/font-awesome.min.css';

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

const App: React.FC = (): ReactElement => {
    return (
        <Provider store={store}>
            <div className='wrapper'>
                <AlertContainer/>
                {routes}
                <Footer/>
            </div>
        </Provider>
    );
};

export default App;
