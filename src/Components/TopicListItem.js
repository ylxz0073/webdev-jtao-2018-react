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
        return (

            <li className="list-group-item">
                    {this.props.title}
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
