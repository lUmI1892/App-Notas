import { types } from "../../types/types";

describe('Pruebas en types.js',()=>{

    const prueba = {
        login: '[Auth] Login',
        logout: '[Auth] Logout',
    
        uiSetError: '[UI] Set Error',
        uiRemoveError: '[UI] Remove Error',
    
        uiStartLoading: '[UI] Start loading',
        uiFinishLoading: '[UI] Finish loading',
    
        notesAddNew: '[Notes] New note',
        notesActive: '[Notes] Set active note',
        notesLoad: '[Notes] Load notes',
        notesUpdated: '[Notes] Updated note',
        notesFileUrl: '[Notes] Delete note',
        notesDelete: '[Notes] Delete note',
        notesLogoutCleaning: '[Notes] Logout Cleaning'
    }
    

    test('Debe de tener estos tipos',()=>{
        expect(prueba).toEqual(types);
    });

});