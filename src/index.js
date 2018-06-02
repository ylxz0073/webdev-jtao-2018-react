import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';
import CourseManager from "./containers/CourseManager";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Stateless from './Components/Stateless'

ReactDOM.render(

    <div>
        <Hello message="Hello there"/>
        <Stateless message="this is a stateless component"/>
        <CourseManager/>
    </div>,
    document.getElementById('root')
);
