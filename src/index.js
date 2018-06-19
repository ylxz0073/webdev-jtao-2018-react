import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';
import CourseManager from "./containers/CourseManager";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Stateless from './Components/Stateless'
import ModuleListItem from "./Components/ModuleListItem";
import ModuleList from "./containers/ModuleList";
import App from "./examples/App"
import {widgetReducer} from "./reducers/widgetReducer"
import {createStore} from 'redux'
import {Provider} from 'react-redux'

let store = createStore(widgetReducer)

ReactDOM.render(

    <Provider store={store}>
        <CourseManager/>

        {/*<Stateless message="this is a stateless component"/>*/}
        {/*<CourseManager/>*/}
        </Provider>,
    document.getElementById('root')
);
