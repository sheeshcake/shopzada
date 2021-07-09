import React from 'react';
import {Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, exact, ...rest}) => {

    let token = JSON.parse(localStorage.getItem("user"));

    console.log(token);

    return (
        <Route  exact render= {props => {
            return  token ? <Component {...props }/> : <Redirect to="/login"/>
        }} />
    )
}

export default PrivateRoute
