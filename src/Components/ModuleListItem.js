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

        var highlightStyle = {
        };
        // console.log(this.props.module.id);
        // console.log(this.props.highlightId);

        if (this.props.module.id == this.props.highlightId) {
            highlightStyle = {
                backgroundColor: 'lightgreen'
            };
        }

        return (



            <li className="list-group-item" style={highlightStyle}>
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}/edit`}
                      onClick={() =>
                      {this.props.highlight(this.props.module.id)
                      }}>
                    {this.props.title}
                </Link>

                <span className='float-right'>
                    {/*<i class="fa fa-trash-alt"></i>*/}
                    {/*<i class="fa-2x fa fa-plus wbdv-create"></i>*/}
                    <button onClick={() =>
                        {this.props.delete(this.props.module.id)
                        }}>
                    DELETE</button>


                    {/*<i className="fa fa-pencil"></i>*/}
                </span>
            </li>
        );
    }
}
