import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'

export default class ModuleListItem
    extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (


            <li className="list-group-item">
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}/edit`}>
                    {this.props.title}
                </Link>

                <span className='float-right'>
                    <button onClick={() =>
                        {this.props.delete(this.props.module.id)}}>
                    DELETE</button>


                    {/*<i className="fa fa-pencil"></i>*/}
                </span>
            </li>
        );
    }
}
