
import {ADD_WIDGET, HEADING_SIZE_CHANGED, HEADING_TEXT_CHANGED, FIND_ALL_WIDGETS, SAVE, PREVIEW} from "../constants";

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText})
)

export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize})
)

export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widgets')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: FIND_ALL_WIDGETS,
            widgets: widgets
        }))
}

export const addWidget = dispatch=> (
    dispatch({type: ADD_WIDGET})
)

export const save = dispatch => (
    dispatch({type: SAVE})
)

export const preview = dispatch => (
    dispatch({type: PREVIEW})
)


