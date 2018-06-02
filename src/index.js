import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';
import CourseManager from "./containers/CourseManager";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Stateless from './Components/Stateless'
import ModuleListItem from "./Components/ModuleListItem";
import ModuleList from "./containers/ModuleList";

ReactDOM.render(

    <div class="container-fluid">
        <ModuleList/>
        <Stateless message="this is a stateless component"/>
        {/*<CourseManager/>*/}
    </div>,
    document.getElementById('root')
);
