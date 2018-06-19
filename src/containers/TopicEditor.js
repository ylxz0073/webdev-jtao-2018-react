import React from "react";
import WidgetList from "./widgetList"
import App from "./widgetList"

export default class TopicEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.setCourseId =
            this.setCourseId.bind(this);
        this.setModuleId =
            this.setModuleId.bind(this);
        this.setLessonId =
            this.setLessonId.bind(this);
        this.setTopicId =
            this.setTopicId.bind(this);
        this.state = {
            courseId: '', moduleId: '', lessonId: '', topicId: ''
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

    setTopicId(topicId) {
        this.setState
        ({topicId: topicId});
    }


    componentDidMount() {
        this.setCourseId(
            this.props.match.params.courseId);

        this.setModuleId(
            this.props.match.params.moduleId);

        this.setLessonId(
            this.props.match.params.lessonId);

        this.setTopicId(
            this.props.match.params.topicId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(
            newProps.match.params.courseId);

        this.setModuleId(
            newProps.match.params.moduleId);

        this.setLessonId(
            newProps.match.params.lessonId);

        this.setTopicId(
            newProps.match.params.topicId);
    }

    render() {
        console.log("@"+this.state.topicId)
        return (
            <div>

                {/*<h4>Lesson Editor</h4>*/}
                {/*<div>*/}
                {/*<span>courseId: {this.state.courseId} </span>*/}
                {/*<span>moduleId: {this.state.moduleId} </span>*/}
                {/*<span>lessonId: {this.state.lessonId} </span>*/}

                {/*</div>*/}
                <div><App
                    courseId={this.props.match.params.courseId}
                    moduleId={this.props.match.params.moduleId}
                    lessonId={this.props.match.params.lessonId}
                    topicId={this.props.match.params.topicId}/></div>



            </div>



        )
    }

}