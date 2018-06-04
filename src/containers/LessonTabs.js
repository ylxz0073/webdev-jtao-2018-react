import React from 'react'
import LessonService from "../services/LessonService";
import LessonTabItem from "../Components/LessonTabItem";

export default class LessonTabs
    extends React.Component {
    constructor() {
        super();
        this.lessonService = LessonService.instance;
        this.state = {
            courseId: "",
            moduleId: "",
            lesson: {title:"",
                    },
            lessons:[]};
        // this.titleChanged = this.titleChanged.bind(this);
        // this.createLesson = this.createLesson.bind(this);
        // this.deleteCourse = this.deleteCourse.bind(this);
        // this.setLessonId = this.setLessonId.bind(this);
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

    renderListOfLessons() {
        console.log(this.state.lessons);
        let lessons = this.state.lessons.map(
            (lesson) => {
                // return <ModuleListItem key={module.id}
                //                        delete={this.deleteModule}
                //                        title={module.title}
                //                        courseId={this.props.courseId}
                //                        module={module}>
                // </ModuleListItem>
                // console.log(lesson);
               return (<LessonTabItem key={lesson.id}
                                     lesson={lesson}
                                    >
               </LessonTabItem>)

            });
        return (
            lessons
        )

    }


    componentWillReceiveProps(newProps){
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId)
    }
    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {
                console.log(lessons);
                this.setLessons(lessons)
            });
    }
    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    render() {
        return(
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active"
                   href="#">
                    Active Tab
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link"
                   href="#">
                    Another Tab
                </a>
            </li>
            {this.renderListOfLessons()}
        </ul>

    );
    }
}
