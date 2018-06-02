import React, {Component} from 'react'
import CourseCard from '../Components/CourseCard'
import ModuleList from './ModuleList'

export default class CourseManager extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Course Manager</h1>
                <ModuleList/>
                <div class="card-deck">
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                    <CourseCard/>
                </div>
            </div>
        )
    }
}