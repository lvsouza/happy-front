import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { LandingPage, OrphanagesMapPage, Orphanage, CreateOrphanage } from './pages';

export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/orphanages-map" component={OrphanagesMapPage} />

                <Route exact path="/orphanages/:id" component={Orphanage} />
                <Route exact path="/orphanages-create" component={CreateOrphanage} />
            </Switch>
        </BrowserRouter>
    );
}
