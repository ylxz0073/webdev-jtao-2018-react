import React from 'react'
import {connect} from "react-redux";
import {DELETE_WIDGET} from "../constants";
import {headingSizeChanged, headingTextChanged, nameTextChanged, urlChanged, hrefChanged, listTextChanged, listTypeChanged} from "../actions";

const WidgetNameField = ({widget, nameTextChanged}) => {
    let inputName
    return (
        <div>
            <div>
                Widget name: {widget.name}
            </div>
            <input className="form-control" onChange={() => nameTextChanged(widget.id, inputName.value)}

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
                {/*<h2> Heading {widget.size}</h2>*/}

                <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                    // value={widget.text}
                       placeholder={"Heading text"}
                       ref={node => inputElem = node}/>


                <select className="form-control" onChange={() => headingSizeChanged(widget.id, selectElem.value)}
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
        hrefChanged(dispatch, widgetId, newText),
    listTextChanged: (widgetId, newText) =>
        listTextChanged(dispatch, widgetId, newText),
    listTypeChanged: (widgetId, newType) =>
        listTypeChanged(dispatch, widgetId, newType)
})

const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading)

const Paragraph = ({widget, preview, headingTextChanged, nameTextChanged}) => {
    let inputElem
    return(
        <div>
            <div hidden={preview}>
                {/*<h2>Paragraph</h2>*/}
                <textarea className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                    // value={widget.text}
                          placeholder={"Paragraph text"}
                          ref={node => inputElem = node}></textarea>
                {<WidgetNameField widget={widget}
                                  nameTextChanged={nameTextChanged}/>}
                <h3>Preview</h3>
            </div>
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
            <div hidden={preview}>
                {/*<h2>Image</h2>*/}
                <input className="form-control" onChange={() => urlChanged(widget.id, inputElem.value)}
                    // value={widget.text}
                       placeholder={"Image URL"}
                       ref={node => inputElem = node}/>
                {<WidgetNameField widget={widget}
                                  nameTextChanged={nameTextChanged}/>}
                <h3>Preview</h3>
            </div>
                {widget.src && <img src={widget.src}/>}
                {widget.name && <div>widget name: {widget.name}</div>}

        </div>
    )
}

const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image)


const UnorderedListField = ({widget}) => {
    let text = widget.listItems
    console.log(text)
    let k = 0
    let listItems = text.split(/\r?\n/).map((item) =>
        <li key={k++}>{item}</li>
    )
    return (
        <ul>
            {listItems}
        </ul>


    )
}

const OrderedListField = ({widget}) => {
    let text = widget.listItems
    let k = 0
    let listItems = text.split(/\r?\n/).map((item) =>
        <li key={k++}>{item}</li>
    )
    return (
        <ol>
            {listItems}
        </ol>


    )
}

const List = ({widget, preview, listTextChanged, listTypeChanged, nameTextChanged}) => {
    let inputElem
    let selectElem

    return (
        <div>
            <div hidden={preview}>
                {/*<h2> List </h2>*/}
                    <textarea className="form-control" onChange={() => listTextChanged(widget.id, inputElem.value)}
                              placeholder={"Enter one list item per line"}
                              value = {widget.listItems}
                              ref={node => inputElem = node}></textarea>
                    <select className="form-control" onChange={() => listTypeChanged(widget.id, selectElem.value)}

                            value={widget.listType}
                            ref={node => selectElem = node}>{console.log(widget)}
                    <option value="unordered">Unordered list</option>
                    <option value="ordered">Ordered list</option>

                    </select>


                {<WidgetNameField widget={widget}
                                  nameTextChanged={nameTextChanged}/>}
                <h3>Preview</h3>
                {console.log(widget)}
                </div>
            {widget.listItems && widget.listType == "unordered" && <UnorderedListField widget={widget}/>}
            {widget.listItems && widget.listType == "ordered" && <OrderedListField widget={widget}/>}
        {console.log(widget)}

        {widget.name && <div>widget name: {widget.name}</div>}
    </div>

    )
}

const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List)

const Link = ({widget, preview, hrefChanged, headingTextChanged, nameTextChanged}) => {
    let inputElem
    let inputHref
    return (

        <div>
            <div hidden={preview}>
                {/*<h2>Link</h2>*/}
                    <div>
                        <input className="form-control" onChange={() => hrefChanged(widget.id, inputHref.value)}
                            // value={widget.text}
                               placeholder={"Link URL"}
                               ref={node => inputHref = node}/>
                    </div>
                    <div>
                        <input className="form-control" onChange={() => headingTextChanged(widget.id, inputElem.value)}
                            // value={widget.text}
                               placeholder={"Link text"}
                               ref={node => inputElem = node}/>
                    </div>


                {<WidgetNameField widget={widget}
                                  nameTextChanged={nameTextChanged}/>}
                <h3>Preview</h3>
            </div>

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
        <form>
            <div hidden={preview}>
                <div className="form-row align-items-center">
                    <div className="col-sm-6 my-1">
                        {/*{widget.id} */}
                        <h2>{widget.widgetType}</h2>
                    </div>
                    <div className="col-auto my-1">
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
                    </div>
                    <div className="col-auto my-1">
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
                    </div>
                    <div className="col-auto my-1">
                        <button onClick={e => (
                            dispatch({type: DELETE_WIDGET, id: widget.id})
                        )}>Delete
                        </button>
                    </div>
            </div>
            </div>
            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType==='List' && <ListContainer widget={widget}/>}
                {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType==='Link' && <LinkContainer widget={widget}/>}
            </div>
        </form>
    )

}

export const WidgetContainer = connect(state => ({
        preview: state.preview
    })

)(Widget)