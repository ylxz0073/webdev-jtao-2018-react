import React from "react";
import TopicList from "./TopicList"
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TopicEditor from "./TopicEditor"

export default class LessonEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.setCourseId =
            this.setCourseId.bind(this);
        this.setModuleId =
            this.setModuleId.bind(this);
        this.setLessonId =
            this.setLessonId.bind(this);
        this.state = {
            courseId: '', moduleId: '', lessonId: ''
        };
    }

    setCourseId(courseId) {
        this.setState
        ({courseId: courseId});
    }
    setModuleId(moduleId) {
        this.setState
        ({moduleId: moduleId});
    }
    setLessonId(lessonId) {
        this.setState
        ({lessonId: lessonId});
    }


    componentDidMount() {
        this.setCourseId(
            this.props.match.params.courseId);

        this.setModuleId(
            this.props.match.params.moduleId);

        this.setLessonId(
            this.props.match.params.lessonId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(
            newProps.match.params.courseId);

        this.setModuleId(
            newProps.match.params.moduleId);

        this.setLessonId(
            newProps.match.params.lessonId);
    }

    render() {
        return (

            <div>
                {/*<h4>Lesson Editor</h4>*/}
                {/*<div>*/}
                    {/*<span>courseId: {this.state.courseId} </span>*/}
                    {/*<span>moduleId: {this.state.moduleId} </span>*/}
                    {/*<span>lessonId: {this.state.lessonId} </span>*/}
                {/*</div>*/}
                <div><TopicList
                    courseId={this.state.courseId}
                    moduleId={this.state.moduleId}
                    lessonId={this.state.lessonId}/></div>
                <Route path= "/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"
                       component= {TopicEditor}/>
            </div>



        )
    }

}