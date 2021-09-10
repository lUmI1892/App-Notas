import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from 'sweetalert2';
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote = ()=>{

    return async( dispatch, getState )=>{

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${uid}/journal/notes`).add( newNote );

        dispatch( activeNote( doc.id, newNote ) );

        dispatch( addNewNote( doc.id, newNote ) );

    }
}

export const activeNote = ( id, note )=>({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note )=>({

    type: types.notesAddNew,
    payload:{
        id,
        ...note
    }

})

export const startLoadingNotes = (uid)=>{
    return async( dispatch ) =>{
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes)=>{
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (note) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFireStore = {...note};

        delete noteToFireStore.id;

        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFireStore );
        //dispatch(startLoadingNotes(uid));
        dispatch(refreshNote(note));
        Swal.fire({
            title: 'Save!',
            text: note.title,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

    }
}

export const refreshNote = (note)=>({
    
    type:types.notesUpdated,
    payload:{note}

})

export const startUploading = (file)=>{
    return async( dispatch, getState )=>{

        const {active:activeNote} = getState().notes;

        Swal.fire({
            title:'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen:()=>{
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        
        dispatch( startSaveNote(activeNote) );


        Swal.close();

    }
}

export const startDelete = ( id )=>{
    return async( dispatch, getState )=>{
        const uid = getState().auth.uid;


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
            if (result.isConfirmed) {

                await db.doc(`${uid}/journal/notes/${id}`).delete();
                dispatch( deleteNote( id ) );
                
                Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
                )
            }
        });
    }
}

export const deleteNote = (id)=>({
        type:types.notesDelete,
        payload:id
})

export const noteLogout = ()=>({

    type:types.notesLogoutCleaning
})