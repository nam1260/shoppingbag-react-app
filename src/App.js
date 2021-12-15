import logo from './logo.svg';
import './App.css';
import Products from './layouts/product/Products'
import Cart from './layouts/cart/Cart'

import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers/"

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'

const store = createStore(rootReducer);

function App() {
    return (
        <Provider store={store}>
        <Router>
            <Switch>
                <div className="App">
                    <Route path="/product" component={Products}/>
                    <Route path="/Cart" component={Cart}/>
                </div>
            </Switch>
        </Router>
        </Provider>
    );
}

export default App;
