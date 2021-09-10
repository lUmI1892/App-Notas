import { types } from "../types/types";


    const initialState = {
        loadding: false,
        msgError: null
    }

export const uiReducer = ( state=initialState, action )=>{

    switch (action.type) {
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        case types.uiStartLoading:
            return {
                ...state,
                loadding:true
            }
        case types.uiFinishLoading:
            return {
                ...state,
                loadding:false
            }
    
        default:
            return state;
    }

}