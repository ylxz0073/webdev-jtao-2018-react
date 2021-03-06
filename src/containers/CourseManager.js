import React, {Component} from 'react'
import CourseCard from '../Components/CourseCard'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import CourseEditor from './CourseEditor'
import CourseList from "./CourseList";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import '../../node_modules/font-awesome/css/font-awesome.min.css';

export default class CourseManager extends Component {
    render() {
        return (
            <Router>

                <div>

                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route path="/course/:courseId/"
                           component={CourseEditor}>
                    </Route>

                    {/*<Route path="/examples">*/}
                        {/*<div>*/}
                            {/*<CourseEditor/>*/}
                            {/*<br/>*/}
                            {/*<LessonTabs/>*/}
                            {/*<ModuleList/>*/}
                            {/*<div className="card-deck">*/}
                                {/*<CourseCard/>*/}
                                {/*<CourseCard/>*/}
                                {/*<CourseCard/>*/}
                                {/*<CourseCard/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</Route>*/}
                </div>
            </Router>
        )
    }
}