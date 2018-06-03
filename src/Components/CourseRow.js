import React from 'react';
import { Link } from 'react-router-dom'

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
        return (
            <tr>
                <td>
                    <Link to={`/course/${this.props.course.id}/edit`}>
                        {this.props.course.title}
                    </Link>

                </td>
                <td>
                    me
                </td>
                {this.renderDateStamp()}
                <td><button className="btn btn-primary"
                            id={this.props.course.id}
                            onClick={() => {this.props.delete(this.props.course.id)}}>
                    Delete</button>
                </td>
            </tr>
        )
    }
}
export default CourseRow;