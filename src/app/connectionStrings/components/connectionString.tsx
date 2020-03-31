/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { IconButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { getConnectionInfoFromConnectionString } from '../../api/shared/utils';
import { getResourceNameFromHostName } from '../../api/shared/hostNameUtils';
import { ConnectionStringProperties } from './connectionStringProperties';
import { useLocalizationContext } from '../../shared/contexts/localizationContext';
import { ResourceKeys } from '../../../localization/resourceKeys';

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
    const { t } = useLocalizationContext();

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
                        text={resourceName}
                        ariaLabel={t(ResourceKeys.connectionStrings.visitConnectionCommand.ariaLabel, {connectionString})}
                        onClick={onSelectConnectionStringClick}
                    />
                </div>
                <div className="actions">
                    <IconButton
                        iconProps={{
                            iconName: 'EditSolid12'
                        }}
                        text={t(ResourceKeys.connectionStrings.editConnectionCommand.label)}
                        ariaLabel={t(ResourceKeys.connectionStrings.editConnectionCommand.ariaLabel, {connectionString})}
                        onClick={onEditConnectionStringClick}
                    />
                    <IconButton
                        iconProps={{
                            iconName: 'Delete'
                        }}
                        text={t(ResourceKeys.connectionStrings.deleteConnectionCommand.label)}
                        ariaLabel={t(ResourceKeys.connectionStrings.deleteConnectionCommand.ariaLabel, {connectionString})}
                        onClick={onDeleteConnectionStringClick}
                    />
                </div>
            </div>

            <div className="properties">
                <ConnectionStringProperties
                    connectionString={connectionString}
                    hostName={hostName}
                    sharedAccessKey={sharedAccessKey}
                    sharedAccessKeyName={sharedAccessKeyName}
                />
            </div>
        </div>
    );
};
