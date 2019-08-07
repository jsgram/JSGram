import React from "react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import { Provider } from "react-redux";
import LoginContainer from "./components/Login/LoginContainer";
import RegisterContainer from "./components/Register/RegisterContainer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <RegisterContainer />
      </div>
      <div>
        <LoginContainer />
      </div>
    </Provider>
  );
};

export default App;
