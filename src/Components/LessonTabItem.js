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
        var highlightStyle = {
        };
        // console.log(this.props.lesson.id);
        // console.log(this.props.highlightId);

        if (this.props.lesson.id == this.props.highlightId) {
            highlightStyle = {
                backgroundColor: 'pink'
            };
        }
        return (

            <li className="nav-item" style={highlightStyle}>

                    <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}`}
                          onClick={() =>
                          {this.props.highlight(this.props.lesson.id)
                          }}>
                        {this.props.title}
                    </Link>

                    <button onClick={() =>
                    {this.props.delete(this.props.lesson.id)}}>
                        X</button>

            </li>
        );
    }
}