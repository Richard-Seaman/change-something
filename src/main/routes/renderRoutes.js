import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function renderRoutes(routes, props = {}) {

    return routes.map((prop, key) => {

        if (prop.redirect) {
            return <Redirect from={prop.path} to={prop.to} key={key} {...props} />
        }

        return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} {...props}/>
    });
    
}