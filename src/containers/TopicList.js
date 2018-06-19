
import TopicService from "../services/TopicService";
import TopicListItem from "../Components/TopicListItem"

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

import {widgetReducer} from "../reducers/widgetReducer";

import {App} from './widgetList'



// let store = createStore(widgetReducer)

export default class TopicList
    extends React.Component {

    constructor() {
        super();

        this.state = {
            courseId: "",
            moduleId: "",
            lessonId: "",
            highlight: "",
            topic: {title:"",
            },
            topics:[]};
        this.titleChanged = this.titleChanged.bind(this);
        this.createTopic = this.createTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
        this.highlightTopic = this.highlightTopic.bind(this);
        this.topicService = TopicService.instance;
    }

    highlightTopic(topicId) {

        this.setState({highlight: topicId});
        console.log("highlight: " + this.state.highlight);
        // console.log(this.state.highlight);

    }

    componentDidMount() {

        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
        this.setLessonId(this.props.lessonId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.setLessonId(newProps.lessonId);
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
                                       topicId={topic.id}
                                       lessonId={this.props.lessonId}
                                       courseId={this.props.courseId}
                                       moduleId={this.props.moduleId}
                                       topic={topic}
                                       title={topic.title}
                                       delete={this.deleteTopic}
                                       highlight={this.highlightTopic}
                                       highlightId={this.state.highlight}

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

                {/*<Provider store={store}>*/}
                    {/*<App/>*/}
                {/*</Provider>*/}

            </div>

        );
    }
}