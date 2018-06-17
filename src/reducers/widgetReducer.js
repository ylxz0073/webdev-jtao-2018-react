import {
    ADD_WIDGET, DELETE_WIDGET, FIND_ALL_WIDGETS, HEADING_SIZE_CHANGED, HEADING_TEXT_CHANGED, PREVIEW,
    SAVE
} from "../constants";


export const widgetReducer = (state = {widgets: [], preview: false}, action) => {

    switch (action.type) {
        case PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
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

            fetch('http://localhost:8080/api/widget/save', {
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
            return newState
        case DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            }
        case ADD_WIDGET:

            return {
                widgets: [
                    ...state.widgets,
                    {id: state.widgets.length + 1, size: '1', text: 'New Widget', widgetType: 'Paragraph'}
                ]
            }
        default:
            return state
    }

}