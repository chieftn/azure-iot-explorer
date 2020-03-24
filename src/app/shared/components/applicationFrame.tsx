import * as React from 'react';
import { Route } from 'react-router-dom';
import SettingsPaneContainer from '../../settings/components/settingsPaneContainer';
import HeaderContainer from './headerContainer';
import Breadcrumb from './breadcrumb';

export const ApplicationFrame: React.FC = props => {
    return (
        <div className="app">
            <HeaderContainer />
            <Route component={Breadcrumb} />
            <SettingsPaneContainer />
            <main role="main">
                {props.children}
            </main>
        </div>
    );
};
