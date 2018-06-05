import React from "react";
import TopicService from "../services/TopicService";
import TopicListItem from "../Components/TopicListItem"

export default class TopicList
    extends React.Component {

    constructor() {
        super();

        this.state = {
            courseId: "",
            moduleId: "",
            lessonId: "",
            topic: {title:"",
            },
            topics:[]};
        this.titleChanged = this.titleChanged.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.topicService = TopicService.instance;
    }

    componentDidMount() {

        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }

    setCourseId(courseId) {
        console.log(courseId);
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        console.log(moduleId);
        this.setState({moduleId: moduleId});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId})
    }

    createTopic(event) {

        var newTopic = {title: 'new topic'}; // default
        if (this.state.topic.title != "") {
            newTopic = this.state.topic;

        }

        this.topicService.createTopic(this.props.lessonId, newTopic).then(() => {
            this.findAllTopicsForLesson
            (this.props.lessonId)
        });

        alert("add success");
    }

    deleteTopic(topicId) {
        this.topicService
            .deleteTopic(topicId)
            .then(() => {
                this.findAllTopicsForLesson
                (this.props.lessonId)
            });
        alert("delete success");
    }

    titleChanged(event) {
        this.setState({topic: {title: event.target.value}});
        console.log(event.target.value);
    }

    renderListOfTopics() {
        // console.log(this.state.topics);
        let topics = this.state.topics.map(
            (topic) => {

                // console.log(lesson);
                return (<TopicListItem key={topic.id}
                                       lessonId={this.props.lessonId}
                                       courseId={this.props.courseId}
                                       moduleId={this.props.moduleId}
                                       topic={topic}
                                       title={topic.title}
                                       delete={this.deleteTopic}
                >
                </TopicListItem>)

            });
        return (
            topics
        )

    }


    componentWillReceiveProps(newProps){
        this.findAllTopicsForLesson(newProps.lessonId)
    }
    findAllTopicsForLesson(topicId) {
        this.topicService
            .findAllTopicsForLesson(topicId)
            .then((topics) => {
                // console.log(lessons);
                this.setTopics(topics)
            });
    }
    setTopics(topics) {
        this.setState({topics: topics})
    }


    render() {
        return(
            <div>
                <div className="input-group">
                    <input className="form-control"
                           onChange={this.titleChanged}
                           value={this.state.topic.title}
                           placeholder="title"/>
                    <div className="input-group-append">

                        <button className="btn btn-primary btn-block"
                                onClick={this.createTopic}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <ul className="list-group">
                    {this.renderListOfTopics()}
                </ul>

                {/*<input className="form-control"*/}
                       {/*onChange={this.titleChanged}*/}
                       {/*value={this.state.lesson.title}*/}
                       {/*placeholder="title"/>*/}
                {/*<button className="btn btn-primary btn-block"*/}
                        {/*onClick={this.createLesson}>*/}
                    {/*<i className="fa fa-plus"></i>*/}
                {/*</button>*/}
                {/*<ul className="nav nav-tabs">*/}
                    {/*{this.renderListOfLessons()}*/}
                {/*</ul>*/}
            </div>

        );
    }
}