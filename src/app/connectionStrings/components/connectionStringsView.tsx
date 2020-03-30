/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { ConnectionString  } from './connectionString';
import { ConnectionStringEditView } from './connectionStringEditView';
import '../../css/_layouts.scss';
import './connectionStringsView.scss';

export interface ConnectionStringsViewProps {
    connectionStrings: string[];
    onAddConnectionString(connectionString: string): void;
    onRemoveConnectionString(connectionString: string): void;
}

export const ConnectionStringsView: React.FC<ConnectionStringsViewProps> = props => {
    const [ connectionStringUnderEdit, setConnectionStringUnderEdit ] = React.useState<string>(undefined);
    const { connectionStrings } = props;

    const onAddConnectionString = () => {
        setConnectionStringUnderEdit('');
    };

    const onEditConnectionString = (connectionString: string) => {
        setConnectionStringUnderEdit(connectionString);
    };

    const onRemoveConnectionString = (connectionString: string) => {
        // tslint:disable-next-line:no-console
        console.log('here we are');
    };

    const onConnectionStringEditCommit = (newConnectionString: string) => {
        setConnectionStringUnderEdit(undefined);
    };

    const onConnectionStringEditDismiss = () => {
        setConnectionStringUnderEdit(undefined);
    };

    return (
        <div className="view">
            <div className="view-command">
                <CommandBar
                    items={[
                        {
                            iconProps: { iconName: 'Add' },
                            key: 'add',
                            onClick: onAddConnectionString,
                            text: 'Add Connection'
                        }
                    ]}
                />
            </div>
            <div className="view-content view-scroll-vertical">
                <div className="connection-strings">
                    {connectionStrings.map(connectionString =>
                        <ConnectionString
                            key={connectionString}
                            connectionString={connectionString}
                            onEditConnectionString={onEditConnectionString}
                            onRemoveConnectionString={onRemoveConnectionString}
                        />
                    )}
                </div>
            </div>
            {connectionStringUnderEdit !== undefined &&
                <ConnectionStringEditView
                    connectionStringUnderEdit={connectionStringUnderEdit}
                    connectionStrings={connectionStrings}
                    isOpen={connectionStringUnderEdit !== undefined}
                    onDismiss={onConnectionStringEditDismiss}
                    onCommit={onConnectionStringEditCommit}
                />
            }
        </div>
    );
};
