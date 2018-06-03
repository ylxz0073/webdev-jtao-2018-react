import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import ModuleEditor from './ModuleEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class CourseEditor
    extends React.Component {
    constructor(props){
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: ''};

    }

    componentDidMount() {
        this.selectCourse
        (this.props.match.params.courseId);
    }


    selectCourse(courseId) {
        this.setState({courseId: courseId});
        // console.log(courseId);
    }

    render() { return(
        <Router>
        <div>
            <h2>Editing Course: {this.state.courseId}</h2>
            <div className="row">
                <div className="col-4">
                    <ModuleList
                        courseId={this.state.courseId}/>
                </div>
                <div className="col-8">
                    {/*<LessonTabs/>*/}

                    <Route path= "/course/:courseId/module/:moduleId/edit"
                           component= {ModuleEditor}/>
                </div>
            </div>
        </div>
        </Router>


    );
    }
}