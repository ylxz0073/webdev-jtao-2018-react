import React from 'react';
import CourseRow from "../Components/CourseRow";
import CourseService from '../services/CourseService';


class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {courses:[],
                        highlight: ''};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);

    }

    componentDidMount() {
        this.findAllCourses()
    }

    findAllCourses(){
        this.courseService
            .findAllCourses()
            .then((courses) => {
                // console.log(courses);
                this.setState({courses: courses});
            });
    }

    renderCourseRows() {
        let courses = null;

        // console.log("render course rows")
        // console.log(this.state)
        if (this.state) {
            courses = this.state.courses.map(
                (course) => {

                    return <CourseRow course={course} key={course.id}
                                      delete={this.deleteCourse}
                                        />
                })


        }
        return (
            courses
        )
    }

    titleChanged(event) {
        // var dateStamp= Date();
        // console.log(dateStamp.toString());
        // this.setState({
        //     course: {created: dateStamp.toString(),
        //         modified: dateStamp.toString()}
        // });
        this.setState({
            course: { title: event.target.value }
        });

    }

    createCourse() {
        // var dateStamp= Date();
        // console.log(dateStamp);
        // this.setState({
        //     course: {created: dateStamp.toString(),
        //             modified: dateStamp.toString()}
        // });
        // console.log(this.state.course);
        this.courseService
            .createCourse(this.state.course)
            .then( () => {
               this.findAllCourses();

            });

    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then( () => {
                this.findAllCourses();

            });

    }


    render() {
            return (
                <div>
                    <h2>Course List</h2>
                    <table className="table">
                        <thead>

                            <tr>
                                <th><input onChange={this.titleChanged}
                                           className="form-control" id="titleFld"
                                           placeholder="cs101"/></th>
                                <th><button onClick={this.createCourse}
                                            className="btn btn-primary">
                                    Add</button></th>
                            </tr>
                            <tr>
                                <th>Title</th>
                                <th>Owned by</th>
                                <th>Last modified by me</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>

            )
        }
    }
    export default CourseList;
