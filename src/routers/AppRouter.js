import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GameWindow from '../components/GameWindow';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                {/* loading screen to path '/' */ }
                <Route path='/' component={GameWindow} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;