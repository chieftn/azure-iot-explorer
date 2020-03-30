/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ConnectionSetting  } from './connectionSetting';
import './connectionSettingsView.scss';
import '../../css/_layouts.scss';

export interface ConnectionSettingsViewProps {
    connectionStrings: string[];
    onAddConnectionString(connectionString: string): void;
    onRemoveConnectionString(connectionString: string): void;
}

export const ConnectionSettingsView: React.FC<ConnectionSettingsViewProps> = props => {
    const { connectionStrings } = props;

    const onAddClick = () => {
        // tslint:disable-next-line:no-console
        console.log('here we are');
    };

    return (
        <div className="view">
            <div className="view-command">
                <CommandBar
                    items={[
                        {
                            iconProps: { iconName: 'Add' },
                            key: 'add',
                            onClick: onAddClick,
                            text: 'Add Resource'
                        }
                    ]}
                />
            </div>
            <div className="view-content view-scroll-vertical">
                {connectionStrings.map(connectionString =>
                    <ConnectionSetting
                        key={connectionString}
                        connectionString={connectionString}
                        onRemoveConnectionSetting={undefined}
                    />
                )}
            </div>
        </div>
    );
};
