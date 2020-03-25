import * as React from 'react';
import { Route } from 'react-router-dom';
import SettingsPaneContainer from '../../settings/components/settingsPaneContainer';
import HeaderContainer from './headerContainer';
import Breadcrumb from './breadcrumb';

export const ApplicationFrame: React.FC = props => {
    return (
        <div className="app">
            <div className="app-masthead">
                <HeaderContainer />
            </div>
            <div className="app-breadcrumb">
                <Route component={Breadcrumb} />
            </div>
            <SettingsPaneContainer />

            <main role="main" className="app-content">
                {props.children}
            </main>
        </div>
    );
};
