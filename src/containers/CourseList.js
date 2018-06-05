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

        this.setState({
            course: { title: event.target.value }
        });

    }

    createCourse() {

        // console.log(this.state.course);
        this.courseService
            .createCourse(this.state.course)
            .then( () => {
               this.findAllCourses();

            });
        alert("add success");
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then( () => {
                this.findAllCourses();

            });
        alert("delete success");
    }


    render() {
            return (

                <div>

                    <nav className="navbar navbar-dark bg-dark justify-content-between">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Course Manager</a>
                        </div>
                        <form className="form-inline">
                             <input onChange={this.titleChanged}
                                   className="form-control form-control mr-sm-2" id="titleFld"
                                   placeholder="cs101"/>
                            <button className="btn btn-primary my-2 my-sm-0"
                                    onClick={this.createCourse}type="submit">Add</button>
                        </form>
                    </nav>

                    <table className="table">

                    </table>
                    <div className="container">
                        <table className="table">
                            <thead>
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
                </div>

            )
        }
    }
    export default CourseList;
