import React from "react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginContainer from "./components/Login/LoginContainer";
import Footer from "./components/Footer/Footer"
import RegisterContainer from "./components/Register/RegisterContainer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";


const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <RegisterContainer />
        <LoginContainer />
        <Footer />
    </Provider>
  );
};

export default App;
