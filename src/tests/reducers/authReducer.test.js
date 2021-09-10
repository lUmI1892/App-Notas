import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('Pruebas en authReducer', () => {

    const initialState = {};

    test('Debe de retornar el estado por defecto ', () => {

        const action = {
            type:'ejemplo'
        }

        const state = authReducer(initialState,action);

        expect( state ).toEqual({});
    })

    test(' Debe de actualizar el state con un uid y name ', () => {

        const action = {
            type:types.login,
            payload:{
                uid: '123456',
                displayName: 'Ronal Fernando'
            }
        };
        
        const state = authReducer( initialState, action );

        expect( state ).toEqual({
            uid:'123456',
            name:'Ronal Fernando'
        });

    })

    test('Debe de retornar el estado vacio', () => {

        const initState = {
            uid: '123456',
            name: 'Ronal Fernando'
        }

        const action = {
            type:types.logout
        };
        
        const state = authReducer( initialState, action );

        expect(state).toEqual({});

    })
    
    
    
})
