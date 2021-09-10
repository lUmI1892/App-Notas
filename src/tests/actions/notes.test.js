import configureStore from 'redux-mock-store' //ES6 modules
import trunk from 'redux-thunk';
import { startLoadingNotes, startNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

const middlewares = [trunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
    auth: {
        uid: 'TESTING'
    }
});

describe('Pruebas con las acciones de notes', () => {
    test('Debe de crear una nueva note startNewNote', async() => {
        
        await store.dispatch( startNewNote() );
        const actions = store.getActions();

        //console.log(actions);

        expect(actions[0]).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        const docId = actions[0].payload.id;
        //console.log(docId);

        await db.doc(`TESTING/journal/notes/${docId}`).delete();

    })

    test('debe de cargar el startLoadingNotes', async() => {
        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();
    
        console.log(actions);
    })
    
})
