import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken, logout} from './auth';
import api from './api';

export default function WAuth({ component: Component, ...rest }) {

    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function verify() {
            const res = await api.get('/api/user/checkToken', { params: { token: getToken() } });

            if (res.data.status === 200) {
                setLoading(false);
            }
            else {
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    }, []);

    return (
        loading ? "Loading..." : <Route
            {...rest}
            render={props => 
                !redirect ? (
                <Component {...props} />
            ) : <Redirect to={{
                pathname: '/admin',
                state: { from: props.location }
            }} />
            } />
    )
}