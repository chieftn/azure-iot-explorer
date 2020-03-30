/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { getConnectionInfoFromConnectionString } from '../../api/shared/utils';
import { getResourceNameFromHostName } from '../../api/shared/hostNameUtils';
import { MaskedCopyableTextField } from '../../shared/components/maskedCopyableTextField';
import './connectionSetting.scss';

export interface ConnectionSettingProps {
    connectionString: string;
    onRemoveConnectionSetting(connectionString: string): void;
}

export const ConnectionSetting: React.FC<ConnectionSettingProps> = props => {
    const connectionSettings = getConnectionInfoFromConnectionString(props.connectionString);
    const { hostName, sharedAccessKey, sharedAccessKeyName  } = connectionSettings;
    const resourceName = getResourceNameFromHostName(hostName);

    return (
        <div className="connection-setting">
            <div className="commands">
                <div className="name">{resourceName}</div>
                <div className="actions">
                    <Button
                        text="Remove"
                        ariaLabel="Remove Connection From List"
                    />
                </div>
            </div>

            <div className="properties">
                <div>
                    <MaskedCopyableTextField
                        ariaLabel={''}
                        allowMask={false}
                        label={'Host Name'}
                        value={hostName}
                        readOnly={true}
                        addNotification={undefined}
                    />

                    <MaskedCopyableTextField
                        ariaLabel={''}
                        allowMask={false}
                        label={'Shared Access Policy Name'}
                        value={sharedAccessKeyName}
                        readOnly={true}
                        addNotification={undefined}
                    />

                    <MaskedCopyableTextField
                        ariaLabel={''}
                        allowMask={false}
                        label={'Shared Access Policy Key'}
                        value={sharedAccessKey}
                        readOnly={true}
                        addNotification={undefined}
                    />
                </div>

            </div>

        </div>
    );
};
