/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { IconButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { getConnectionInfoFromConnectionString } from '../../api/shared/utils';
import { getResourceNameFromHostName } from '../../api/shared/hostNameUtils';
import { ConnectionStringProperties } from './connectionStringProperties';
import './connectionString.scss';

export interface ConnectionStringProps {
    connectionString: string;
    onEditConnectionString(connectionString: string): void;
    onDeleteConnectionString(connectionString: string): void;
    onSelectConnectionString(connectionString: string, hostName: string): void;
}

export const ConnectionString: React.FC<ConnectionStringProps> = props => {
    const { connectionString, onEditConnectionString, onDeleteConnectionString, onSelectConnectionString } = props;
    const connectionSettings = getConnectionInfoFromConnectionString(connectionString);
    const { hostName, sharedAccessKey, sharedAccessKeyName } = connectionSettings;
    const resourceName = getResourceNameFromHostName(hostName);

    const onEditConnectionStringClick = () => {
        onEditConnectionString(connectionString);
    };

    const onDeleteConnectionStringClick = () => {
        onDeleteConnectionString(connectionString);
    };

    const onSelectConnectionStringClick = () => {
        onSelectConnectionString(connectionString, hostName);
    };

    return (
        <div className="connection-string">
            <div className="commands">
                <div className="name">
                    <ActionButton
                        text={hostName}
                        ariaLabel={'aria label'}
                        onClick={onSelectConnectionStringClick}
                    />
                </div>
                <div className="actions">
                    <IconButton
                        iconProps={{
                            iconName: 'EditSolid12'
                        }}
                        text="Edit Connection String"
                        ariaLabel="Edit Connection From List"
                        onClick={onEditConnectionStringClick}
                    />
                    <IconButton
                        iconProps={{
                            iconName: 'Delete'
                        }}
                        text="Remove Connection From List"
                        ariaLabel="Remove Connection From List"
                        onClick={onDeleteConnectionStringClick}
                    />
                </div>
            </div>

            <div className="properties">
                <ConnectionStringProperties
                    hostName={hostName}
                    sharedAccessKey={sharedAccessKey}
                    sharedAccessKeyName={sharedAccessKeyName}
                />
            </div>
        </div>
    );
};
