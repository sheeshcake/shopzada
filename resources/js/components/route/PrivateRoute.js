import React from 'react';
import {Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, data: NULL, exact, ...rest}) => {

    let token = JSON.parse(localStorage.getItem("user"));
    return (
        <Route  exact render= {props => {
            return  token ? <Component {...props }/> : <Redirect to="/login"/>
        }} />
    )
}

export default PrivateRoute
