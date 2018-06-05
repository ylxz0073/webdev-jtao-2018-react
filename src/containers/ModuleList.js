import React from 'react'
import ModuleListItem from '../Components/ModuleListItem';
import ModuleService from '../services/ModuleService'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class ModuleList
    extends React.Component {
    constructor(props) {
        super();
        this.state = {
            courseId: '',
            module: { title: ''},
            highlight: '',
            modules: [

            ]
        };


        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId =
            this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.highlightModule = this.highlightModule.bind(this);
        this.moduleService = ModuleService.instance;
    }

    componentDidMount() {

        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
    }

    setCourseId(courseId) {
        console.log(courseId);
        this.setState({courseId: courseId});
    }

    createModule(event) {

        var newModel = {title: 'new module'}; // default
        if (this.state.module.title != "") {
            newModel = this.state.module;

        }

        this.moduleService.createModule(this.props.courseId, newModel).then(() => {
            this.findAllModulesForCourse
            (this.props.courseId)
        });
        alert("add success");

    }

    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(this.props.courseId,moduleId)
            .then(() => {
                this.findAllModulesForCourse
                (this.props.courseId)
            });
        alert("delete success");
    }

    highlightModule(moduleId) {
        // console.log("highlight: " + moduleId);
        this.setState({highlight: moduleId});
        // console.log(this.state.highlight);

    }


    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
        // console.log(event.target.value);
    }


    renderListOfModules() {
        let modules = this.state.modules.map(
            (module) => {
            return <ModuleListItem key={module.id}
                                   delete={this.deleteModule}
                                   title={module.title}
                                   highlight={this.highlightModule}
                                   highlightId={this.state.highlight}
                                   courseId={this.props.courseId}
                                    module={module}>
                    </ModuleListItem>
        });
        return (
            modules
        )

    }


    componentWillReceiveProps(newProps){
        this.findAllModulesForCourse(newProps.courseId)
    }
    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                // console.log(modules);
                this.setModules(modules)});
    }
    setModules(modules) {
        this.setState({modules: modules})
    }

    render() {
        return (

                <div>
                    <div className="input-group">
                        <input className="form-control"
                            onChange={this.titleChanged}
                               value={this.state.module.title}
                            placeholder="title"/>
                        <div className="input-group-append">
                            <button className="btn btn-primary btn-block"
                                onClick={this.createModule}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {this.renderListOfModules()}
                    </ul>
                    {/*<div id="wbdv-alert-success" display="none" class="alert alert-success alert-dismissible fade show" role="alert">*/}
                        {/*<strong>Great!</strong> Update successfully.*/}
                    {/*</div>*/}

                </div>



        )
    }
}
