import React from 'react';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom'
import CourseEditor from "../containers/CourseEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props) {
        super(props)
        // this.renderDateStamp()

    }

    renderDateStamp() {
        var date = new Date(this.props.course.modified)
        var currentDate = new Date()
        // console.log(date.getFullYear())
        // console.log(currentDate.getFullYear())

        if (date.getFullYear() === currentDate.getFullYear()
            && date.getMonth() === currentDate.getMonth()
            && date.getDate() === currentDate.getDate()
        ) {
            return <td>{date.toLocaleTimeString()}</td>
        }
        else {
            return <td>{date.toLocaleDateString()}</td>
        }
    }


    render() {
        // const linkTo = {
        //     pathname: `/course/${this.props.course.id}`,
        //     state : {courseTitle: this.props.course.title}
        //
        // }
        const Style = {
            padding: 5,
        };
        return (

                <tr>
                    <td>
                        <span><i className="fa fa-xx fas fa-address-card"></i></span>
                        <Link to={`/course/${this.props.course.id}/edit`}>
                            {/*<i className="fa fas fa-chalkboard-teacher"></i>*/}
                            {/*<i className="fa-2x fa fa-search"></i>*/}

                              { this.props.course.title}
                        </Link>

                    </td>
                    <td>
                        me
                    </td>
                    {this.renderDateStamp()}
                    <td style={Style}><button className="btn btn-primary"
                                id={this.props.course.id}
                                onClick={() => {
                                    this.props.delete(this.props.course.id)
                                    }}>
                        Delete</button>
                    </td>

                </tr>

        )
    }
}
export default CourseRow;