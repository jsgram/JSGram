import React from "react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import { Provider } from "react-redux";
import routes from "./routes";
import { Footer } from "./components/Footer/Footer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import AlertContainer from "./components/Alert/AlertContainer";
import "bootstrap/dist/css/bootstrap.min.css";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AlertContainer />
      {routes}
      <Footer />
    </Provider>
  );
};

export default App;
