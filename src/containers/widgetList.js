import React, {Component} from 'react'
import {connect} from "react-redux";
import {addWidget, findAllWidgets, preview} from "../actions";
import {WidgetContainer} from "../Components/Widget";
import {save} from "../actions"
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../reducers/widgetReducer'



class WidgetList extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.props.findAllWidgets(this.props.topicId)
    }
    // ({widgets, dispatch})
    componentDidMount() {
        console.log(this.props);
        this.props.findAllWidgets(this.props.topicId)
    }

    componentWillReceiveProps(newProps) {
        // console.log(this.props);
        if (this.props.topicId !== newProps.topicId) {
            console.log(this.props);
            this.props.findAllWidgets(newProps.topicId)
        }
    }


    render() {
        var index = 0
        return(
            <div>
                {/*{console.log(this.props.widgets)}*/}
                <h2>Widget List
                    {/*{this.props.widgets.length}*/}
                    </h2>
                    <form>
                        <div className="form-row align-items-center">
                            <div className="col-sm-8 my-1">
                            </div>
                            <div className="col-auto my-1">
                                <button type="button" hidden={this.props.previewMode} onClick={() => this.props.save(this.props.topicId)}>
                                Save
                                </button>
                            </div>
                            <div className="col-auto my-1">
                                <button type="button" onClick={this.props.preview}>
                                    Preview
                                </button>
                            </div>
                        </div>
                    </form>
                <ul>
                    {this.props.widgets.sort((x, y) => x.widgetOrder - y.widgetOrder).map((widget) => {
                        console.log(widget.widgetOrder)
                        return (

                            <WidgetContainer widget={widget}
                                             preview={this.props.previewMode}
                                             widgetIndex={index++}
                                             widgetsLength={this.props.widgets.length}
                                             key={widget.id}/>

                        )

                    })}
                </ul>
                <button onClick={this.props.addWidget}>Add widget</button>
            </div>
        )
    }

}


const stateToPropertiesMapper = (state) => (
    {
        widgets: state.widgets,
        previewMode: state.preview
    }
)

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: (id) => findAllWidgets(dispatch, id),
    addWidget: () => addWidget(dispatch),
    save: (topicId) => save(dispatch, topicId),
    preview: () => preview(dispatch)
})

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList);

export default App;