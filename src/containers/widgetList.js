import React, {Component} from 'react'
import {connect} from "react-redux";
import {addWidget, findAllWidgets, preview} from "../actions";
import {WidgetContainer} from "../Components/Widget";
import {save} from "../actions"

class WidgetList extends Component {
    constructor(props) {
        super(props)
        this.props.findAllWidgets()
    }
    // ({widgets, dispatch})

    render() {
        var index = 0
        return(
            <div>
                {console.log(this.props.widgets)}
                <h1>Widget List {this.props.widgets.length}</h1>

                <button hidden={this.props.previewMode} onClick={this.props.save}>
                    Save
                </button>
                <button onClick={this.props.preview}>
                    Preview
                </button>
                <ul>
                    {this.props.widgets.map((widget) => {
                        console.log("widget: " + widget)
                        console.log("widgets: " + this.props.widgets)
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
    findAllWidgets: () => findAllWidgets(dispatch),
    addWidget: () => addWidget(dispatch),
    save: () => save(dispatch),
    preview: () => preview(dispatch)
})

export const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList)