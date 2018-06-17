import React from 'react'
import {connect} from "react-redux";
import {DELETE_WIDGET} from "../constants";
import {headingSizeChanged, headingTextChanged, nameTextChanged, urlChanged, hrefChanged} from "../actions";

const WidgetNameField = ({widget, nameTextChanged}) => {
    let inputName
    return (
        <div>
            <div>
                Widget name: {widget.name}
            </div>
            <input onChange={() => nameTextChanged(widget.id, inputName.value)}

                   placeholder={widget.name}
                   ref={node => inputName = node}/>

        </div>

    )
}

const Heading = ({widget, preview, headingSizeChanged, headingTextChanged, nameTextChanged}) => {
    let selectElem
    let inputElem
    let inputName
    return (
        <div>
            <div hidden={preview}>
                <h2> Heading {widget.size}</h2>
                <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                    // value={widget.text}
                       placeholder={"Heading text"}
                       ref={node => inputElem = node}/>
                <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                        value={widget.size}
                        ref={node => selectElem = node}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </select>


                {<WidgetNameField widget={widget}
                                    nameTextChanged={nameTextChanged}/>}
                <h3>Preview</h3>
            </div>

            {/*{console.log(widget)}*/}
            {widget.size == "1" && <h1>{widget.text}</h1>}
            {widget.size == "2" && <h2>{widget.text}</h2>}
            {widget.size == "3" && <h3>{widget.text}</h3>}
            {widget.name && <div>widget name: {widget.name}</div>}
        </div>
    )
}

const stateToPropsMapper = state => ({
    preview: state.preview
})

const dispatchToPropsMapper = dispatch => ({
    headingTextChanged: (widgetId, newText) =>
        headingTextChanged(dispatch, widgetId, newText),
    headingSizeChanged: (widgetId, newSize) =>
        headingSizeChanged(dispatch, widgetId, newSize),
    nameTextChanged: (widgetId, newText) =>
        nameTextChanged(dispatch, widgetId, newText),
    urlChanged: (widgetId, newText) =>
        urlChanged(dispatch, widgetId, newText),
    hrefChanged: (widgetId, newText) =>
        hrefChanged(dispatch, widgetId, newText)
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)

const Paragraph = ({widget, preview, headingTextChanged, nameTextChanged}) => {
    let inputElem
    return(
        <div>
            <h2>Paragraph</h2>
            <textarea onChange={() => headingTextChanged(widget.id, inputElem.value)}
                // value={widget.text}
                      placeholder={"Paragraph text"}
                      ref={node => inputElem = node}></textarea>
            {<WidgetNameField widget={widget}
                              nameTextChanged={nameTextChanged}/>}
            <h3>Preview</h3>
            {widget.text !== "" && <div>{widget.text}</div>}
            {widget.name && <div>widget name: {widget.name}</div>}
        </div>
    )
}

const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph)

const Image = ({widget, preview, urlChanged, nameTextChanged}) => {
    let inputElem
    return (

        <div>
            <h2>Image</h2>
                <input onChange={() => urlChanged(widget.id, inputElem.value)}
                    // value={widget.text}
                       placeholder={"Image URL"}
                       ref={node => inputElem = node}/>
                {<WidgetNameField widget={widget}
                                  nameTextChanged={nameTextChanged}/>}
                <h3>Preview</h3>
                {widget.url && <img src={widget.url}/>}
                {widget.name && <div>widget name: {widget.name}</div>}
        </div>
    )
}

const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)

const List = () => (
    <h2>List</h2>
)

const Link = ({widget, preview, hrefChanged, headingTextChanged, nameTextChanged}) => {
    let inputElem
    let inputHref
    return (

        <div>
            <h2>Link</h2>
                <div>
                    <input onChange={() => hrefChanged(widget.id, inputHref.value)}
                        // value={widget.text}
                           placeholder={"Link URL"}
                           ref={node => inputHref = node}/>
                </div>
                <div>
                    <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                        // value={widget.text}
                           placeholder={"Link text"}
                           ref={node => inputElem = node}/>
                </div>


            {<WidgetNameField widget={widget}
                              nameTextChanged={nameTextChanged}/>}
            <h3>Preview</h3>


            {<a href={widget.href}>{widget.text}</a>}
            {widget.text !== "" && <div>{widget.text}</div>}
            {widget.name && <div>widget name: {widget.name}</div>}
        </div>
    )
}

const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link)

export const Widget = ({widget, preview, widgetIndex, widgetsLength, dispatch}) => {
    let selectElement

    return(
        <li>
            <div hidden={preview}>
                {widget.id} {widget.widgetType}

                <button hidden={widgetIndex==0}
                        onClick={() => {
                    dispatch({
                        type: 'MOVE_UP',
                        widget: widget
                    })
                }}>▲</button>

                <button hidden={widgetIndex==widgetsLength-1}
                        onClick={() => {
                    dispatch({
                        type: 'MOVE_DOWN',
                        widget: widget
                    })
                }}>▼</button>

                <select value={widget.widgetType} onChange={e =>
                    dispatch({
                        type: 'SELECT_WIDGET_TYPE',
                        id: widget.id,
                        widgetType: selectElement.value
                    })} ref={node => selectElement = node}>
                    <option>Heading</option>
                    <option>Paragraph</option>
                    <option>List</option>
                    <option>Image</option>
                    <option>Link</option>
                </select>
                <button onClick={e => (
                    dispatch({type: DELETE_WIDGET, id: widget.id})
                )}>Delete
                </button>
            </div>

            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType==='List' && <List widget={widget}/>}
                {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType==='Link' && <LinkContainer widget={widget}/>}
            </div>
        </li>
    )

}

export const WidgetContainer = connect(state => ({
        preview: state.preview
    })

)(Widget)