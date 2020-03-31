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
    onDeleteConnectionString(connectionString: string): void;
    onUpsertConnectionString(newConnectionString: string, connectionString: string): void;
    onSelectConnectionString(connectionString: string, hostName: string): void;
}

export const ConnectionStringsView: React.FC<ConnectionStringsViewProps> = props => {
    const [ connectionStringUnderEdit, setConnectionStringUnderEdit ] = React.useState<string>(undefined);
    const { connectionStrings, onDeleteConnectionString, onUpsertConnectionString, onSelectConnectionString } = props;

    const onAddConnectionStringClick = () => {
        setConnectionStringUnderEdit('');
    };

    const onDeleteConnectionStringClick = (connectionString: string) => {
        onDeleteConnectionString(connectionString);
        setConnectionStringUnderEdit(undefined);
    };

    const onEditConnectionStringClick = (connectionString: string) => {
        setConnectionStringUnderEdit(connectionString);
    };

    const onConnectionStringEditCommit = (connectionString: string) => {
        onUpsertConnectionString(connectionString, connectionStringUnderEdit);
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
                            onClick: onAddConnectionStringClick,
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
                            onEditConnectionString={onEditConnectionStringClick}
                            onDeleteConnectionString={onDeleteConnectionStringClick}
                            onSelectConnectionString={onSelectConnectionString}
                        />
                    )}
                </div>
            </div>
            {connectionStringUnderEdit !== undefined &&
                <ConnectionStringEditView
                    connectionStringUnderEdit={connectionStringUnderEdit}
                    connectionStrings={connectionStrings}
                    onDismiss={onConnectionStringEditDismiss}
                    onCommit={onConnectionStringEditCommit}
                />
            }
        </div>
    );
};
