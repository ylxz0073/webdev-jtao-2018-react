import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'

export default class LessonTabItem
    extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <li className="nav-item">
                <a className="nav-link active"
                   >
                    {this.props.lesson.title}
                    <button onClick={() =>
                    {this.props.delete(this.props.lesson.id)}}>
                        X</button>
                </a>

            </li>
        );
    }
}