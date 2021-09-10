import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import {firebase} from '../firebase/firebase-config';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setchecking ] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        firebase.auth().onAuthStateChanged((user)=>{
            if(user?.uid){
                dispatch( login(user.uid, user.displayName) );
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));

            }else{
                setIsLoggedIn(false);
            }

            setchecking(false);
        });

        
    }, [ dispatch,setchecking,isLoggedIn ])

    if( checking ){
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAutenticated={isLoggedIn}
                        path="/auth"
                        component={AuthRouter}
                    />
                    <PrivateRoute
                        exact
                        isAutenticated={isLoggedIn}
                        path="/"
                        component={JournalScreen}
                    />
                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
