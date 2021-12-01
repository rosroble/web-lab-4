import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {configureRootTheme} from '@yandex/ui/Theme'
import {theme} from '@yandex/ui/Theme/presets/default'
import {Provider} from "react-redux";
import {setupStore} from "./store";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

configureRootTheme({ theme })

const reduxStore = setupStore();
ReactDOM.render(
    <div>
        <Provider store={reduxStore}>
        <BrowserRouter>
            <Switch>
                <Route exact path={["/", "/login"]} component={LoginPage}/>
                <Route exact path="/register" component={RegisterPage}/>
                <Route exact path="/main" component={MainPage}/>
            </Switch>
        </BrowserRouter>
        </Provider>
    </div>,
  document.getElementById('root')
);

