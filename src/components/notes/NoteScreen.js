import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDelete } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active} = useSelector(state => state.notes);
    const [ formValue, handleInputChange, reset ] = useForm(active);
    const { body, title, id} = formValue;
    const activeId = useRef( active.id );

    useEffect(() => {
        
        if( active.id !== activeId.current ){
            reset(active);
            activeId.current = active.id;
        }
    }, [active, reset])

    useEffect(() => {
        
        dispatch(activeNote( formValue.id,{...formValue} ));

    }, [ formValue,dispatch ])

    const handleDelete = ()=>{
        
        dispatch( startDelete(id) );
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar/>
            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awsome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    name="body"
                    placeholder="What happend today"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                >
                </textarea>

                {
                    active.url
                    &&
                    (
                        <div className="notes__image">
                            <img
                                src={active.url}
                                alt={active.title}
                            />
                        </div>
                    )
                }
                

            </div>
            <button 
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Eliminar</button>
        </div>
    )
}
