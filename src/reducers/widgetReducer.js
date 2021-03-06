import {
    ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, HEADING_SIZE_CHANGED, HEADING_TEXT_CHANGED, PREVIEW,
    SAVE, MOVE_UP, MOVE_DOWN, NAME_TEXT_CHANGED, URL_CHANGED, HREF_CHANGED, LIST_TEXT_CHANGED, LIST_TYPE_CHANGED
} from "../constants";

// Array.prototype.move = function (from, to) {
//     this.splice(to, 0, this.splice(from, 1)[0]);
// };

const resetOrder = (widgets) => {
    for (var i = 0; i < widgets.length; i++) {
        widgets[i].widgetOrder = i
    }
    return widgets
}

const switchIndex = (i, j, array) => {
    let temp = array[i].widgetOrder
    array[i].widgetOrder = array[j].widgetOrder
    array[j].widgetOrder = temp
    array.sort((x,y) => x.widgetOrder - y.widgetOrder)
    return array
}

export const widgetReducer = (state = {widgets: [], preview: false}, action) => {
    let index
    let newWidgets
    switch (action.type) {
        case MOVE_UP:

            // index = state.widgets.indexOf(action.widget);
            // state.widgets.move(index, index - 1);
            //
            // newWidgets = {
            //     widgets: state.widgets.splice(0),
            //     preview: state.preview}
            // return newWidgets;
            index = state.widgets.indexOf(action.widget)
            if(index === 0) {
                return state
            } else {
                newState = {
                    widgets: resetOrder(switchIndex(index, index - 1, state.widgets)),
                    preview: state.preview
                }
                return JSON.parse(JSON.stringify(newState))
            }

        case MOVE_DOWN:

            // index = state.widgets.indexOf(action.widget);
            // state.widgets.move(index, index + 1);
            //
            // newWidgets = {
            //     widgets: state.widgets.splice(0),
            //     preview: state.preview}
            //
            // return newWidgets;

            index = state.widgets.indexOf(action.widget)
            if(index >=  state.widgets.length - 1) {
                return state
            } else {
                newState = {
                    widgets: resetOrder(switchIndex(index, index + 1, state.widgets)),
                    preview: state.preview
                }
                return JSON.parse(JSON.stringify(newState))
            }
        case LIST_TEXT_CHANGED:
            return {

                widgets: state.widgets.map(widget => {
                    if(widget.id == action.id) {
                        // console.log(action.text)
                        widget.listItems = action.listItems
                    }
                    return Object.assign({}, widget)
                })
            }

        case LIST_TYPE_CHANGED:
            return {

                widgets: state.widgets.map(widget => {
                    if(widget.id == action.id) {
                        // console.log(action.text)
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            }


        case PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            }

        case HREF_CHANGED:
            return {

                widgets: state.widgets.map(widget => {
                    if(widget.id == action.id) {
                        // console.log(action.text)
                        widget.href = action.href
                    }
                    return Object.assign({}, widget)
                })
            }

        case URL_CHANGED:
            return {

                widgets: state.widgets.map(widget => {
                    if(widget.id == action.id) {
                        widget.src = action.src
                    }
                    return Object.assign({}, widget)
                })
            }

        case NAME_TEXT_CHANGED:
            return {

                widgets: state.widgets.map(widget => {
                    if(widget.id == action.id) {
                        widget.name = action.text
                    }
                    return Object.assign({}, widget)
                })
            }


        case HEADING_TEXT_CHANGED:
            return {

                widgets: state.widgets.map(widget => {
                    if(widget.id == action.id) {
                        widget.text = action.text
                        console.log(action.text)
                    }
                    return Object.assign({}, widget)
                })
            }

        case HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id == action.id) {
                        widget.size = action.size

                    }
                    console.log(action.size)
                    return Object.assign({}, widget)
                })
            }
        case 'SELECT_WIDGET_TYPE':
            console.log(action)
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true
                })
            }
            return JSON.parse(JSON.stringify(newState))
        case SAVE:
            for(var i = 0; i < state.widgets.length; i++) {
                for (var j = i + 1; j < state.widgets.length; j++) {
                    if(state.widgets[i].name != null && state.widgets[i].name != "" && state.widgets[i].name == state.widgets[j].name) {
                        alert("duplicate widget name")
                        return state
                    }
                }
            }
            console.log(state.widgets)
            fetch('https://jtao-webdev-hw-2018.herokuapp.com/api/topic/topicId/widget'.replace('topicId', action.topicId), {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'
                }
            })

            return state
        case FIND_ALL_WIDGETS:
            newState = Object.assign({},state)
            newState.widgets = action.widgets
            console.log("*** find all *** " + newState.widgets)
            return newState
        case DELETE_WIDGET:
            return {
                widgets: resetOrder(state.widgets.filter(widget => (
                    widget.id !== action.id
                )))
            }
        case ADD_WIDGET:

            return {
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length + 1, size: '1', listType: 'unordered',text: '', widgetType: 'Heading', widgetOrder: state.widgets.length}
                ]
            }
        default:
            return state
    }

}