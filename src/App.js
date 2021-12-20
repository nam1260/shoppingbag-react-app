import './App.css';
import React from 'react';
import Header from "./layouts/Header"
import Products from './layouts/Products'
import Cart from './layouts/Cart'
import Styled from "styled-components"
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store/reducers/"
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'


const store = createStore(rootReducer);
const persistor = persistStore(store);

const Content = Styled.div`
    position: relative;
    display: inline-block;
`

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor = {persistor}>
                <Router>
                    <Switch>
                        <div className="App">
                            <Header/>
                            <Content>
                                <Route path="/cart" exact component={Cart}/>
                                <Route path="/products" exact component={Products}/>
                                <Route path="/" exact component={() => <Redirect to="/products"/>}/>
                            </Content>

                        </div>
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
