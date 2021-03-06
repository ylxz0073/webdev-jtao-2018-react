import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import ModuleEditor from './ModuleEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseService from "../services/CourseService";

export default class CourseEditor
    extends React.Component {
    constructor(props){
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.courseService = CourseService.instance;
        // const courseTitle = this.props.location.state.courseTitle;
        this.state = {courseId: '',
                    courseTitle: ''};

    }

    componentDidMount() {
        // console.log("###courseTitle: ");
        // console.log(this.props);
        this.selectCourse
        (this.props.match.params.courseId);
        // console.log(this.state);
    }

    componentWillReceiveProps(newProps) {
        this.selectCourse
        (this.props.match.params.courseId);
    }
    selectCourse(courseId) {
        this.setState({courseId: courseId});
        this.courseService.findCourseById(courseId).then(
            (course) => {
                // console.log(course);
                this.setState({courseTitle: course.title});
            }
        )

        // console.log(courseId);
    }


    render() { return(
        <Router>
        <div>
            <nav className="navbar navbar-dark bg-dark justify-content-between">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">{this.state.courseTitle}</a>
                </div>
            </nav>

            <div className="row">
                <div className="col-sm-4">
                    <ModuleList
                        courseId={this.state.courseId}/>
                </div>
                <div className="col-sm-8">
                    {/*<LessonTabs/>*/}

                    <Route path= "/course/:courseId/module/:moduleId"
                           component= {ModuleEditor}/>
                </div>
            </div>
        </div>
        </Router>


    );
    }
}