import React from "react";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from "./routes"
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import Footer from "./components/Footer/Footer"

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {routes}
      <Footer />
    </Provider>
  );
};

export default App;