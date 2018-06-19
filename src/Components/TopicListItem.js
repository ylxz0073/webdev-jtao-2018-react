import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'

export default class TopicListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        var highlightStyle = {
        };
        // console.log(this.props.topic.id);
        // console.log(this.props.highlightId);

        if (this.props.topic.id == this.props.highlightId) {
            highlightStyle = {
                backgroundColor: 'lightgreen'
            };
        }
        return (

            <li className="list-group-item" style={highlightStyle}>
                <Link to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topicId}`}
                      onClick={() =>
                      {this.props.highlight(this.props.topic.id)
                      }}>
                    {this.props.title}
                </Link>
                <span className='float-right'>
                    <button onClick={() =>
                    {this.props.delete(this.props.topic.id)}}>
                    DELETE</button>


                    {/*<i className="fa fa-pencil"></i>*/}
                </span>
            </li>
        );
    }
}
