import * as React from 'react';
import { Route } from 'react-router-dom';
import SettingsPaneContainer from '../../settings/components/settingsPaneContainer';
import HeaderContainer from './headerContainer';
import Breadcrumb from './breadcrumb';

export const ApplicationFrame: React.FC = props => {
    return (
        <div className="app">
            <HeaderContainer />
            <div className="content">
                <SettingsPaneContainer />
                <main role="main">
                    <div className="view">
                        <div className="view-header">
                            <Route component={Breadcrumb} />
                        </div>
                        <div className="view-content">
                            {props.children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
