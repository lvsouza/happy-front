import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LandingPage, OrphanagesMapPage } from './pages';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/orphanages/map" component={OrphanagesMapPage} />
            </Switch>
        </BrowserRouter>
    );
}
