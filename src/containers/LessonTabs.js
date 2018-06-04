import React from 'react'
import LessonService from "../services/LessonService";
import LessonTabItem from "../Components/LessonTabItem";

export default class LessonTabs
    extends React.Component {
    constructor() {
        super();

        this.state = {
            courseId: "",
            moduleId: "",
            lesson: {title:"",
                    },
            lessons:[]};
        this.titleChanged = this.titleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.lessonService = LessonService.instance;
    }

    componentDidMount() {

        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.setModuleId(this.props.moduleId);
    }

    setCourseId(courseId) {
        console.log(courseId);
        this.setState({courseId: courseId});
    }

    setModuleId(moduleId) {
        console.log(moduleId);
        this.setState({moduleId: moduleId});
    }

    createLesson(event) {

        var newLesson = {title: 'new lesson'}; // default
        if (this.state.lesson.title != "") {
            newLesson = this.state.lesson;

        }

        this.lessonService.createLesson(this.props.moduleId, newLesson).then(() => {
            this.findAllLessonsForModule
            (this.props.moduleId)
        });


    }

    deleteLesson(lessonId) {
        this.lessonService
            .deleteLesson(lessonId)
            .then(() => {
                this.findAllLessonsForModule
                (this.props.moduleId)
            });
    }


    titleChanged(event) {
        this.setState({lesson: {title: event.target.value}});
        console.log(event.target.value);
    }

    renderListOfLessons() {
        console.log(this.state.lessons);
        let lessons = this.state.lessons.map(
            (lesson) => {

                // console.log(lesson);
               return (<LessonTabItem key={lesson.id}
                                    lessonId={lesson.id}
                                      courseId={this.props.courseId}
                                      moduleId={this.props.moduleId}
                                     lesson={lesson}
                                      title={lesson.title}
                                      delete={this.deleteLesson}
                                    >
               </LessonTabItem>)

            });
        return (
            lessons
        )

    }


    componentWillReceiveProps(newProps){
        this.findAllLessonsForModule(newProps.moduleId)
    }
    findAllLessonsForModule(moduleId) {
        this.lessonService
            .findAllLessonsForModule(moduleId)
            .then((lessons) => {
                // console.log(lessons);
                this.setLessons(lessons)
            });
    }
    setLessons(lessons) {
        this.setState({lessons: lessons})
    }


    render() {
        return(
            <div>
                <input className="form-control"
                       onChange={this.titleChanged}
                       value={this.state.lesson.title}
                       placeholder="title"/>
                <button className="btn btn-primary btn-block"
                        onClick={this.createLesson}>
                    <i className="fa fa-plus"></i>
                </button>
                <ul className="nav nav-tabs">
                    {this.renderListOfLessons()}
                </ul>
            </div>

    );
    }
}
