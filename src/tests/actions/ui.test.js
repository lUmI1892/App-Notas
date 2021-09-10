
import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('Pruebas en las acciones de UI', () => {
    test('Todas las acciones deben de funcionar', () => {
        
        const action = setError('mensaje de prueba');
        expect(action).toEqual({
            type:types.uiSetError,
            payload:'mensaje de prueba'
        });

        const removeErrorAction = removeError();

        expect(removeErrorAction).toEqual({
            type:types.uiRemoveError
        });

        const startLoadingAction = startLoading();

        expect(startLoadingAction).toEqual({
            type:types.uiStartLoading
        });

        const finishLoadingAction = finishLoading();

        expect(finishLoadingAction).toEqual({
            type:types.uiFinishLoading
        });


    })
    
})
