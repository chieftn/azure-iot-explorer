/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { MaskedCopyableTextField } from '../../shared/components/maskedCopyableTextField';

export interface ConnectionStringPropertiesProps {
    hostName: string;
    sharedAccessKey: string;
    sharedAccessKeyName: string;
}

export const ConnectionStringProperties: React.FC<ConnectionStringPropertiesProps> = props => {
    const { hostName, sharedAccessKey, sharedAccessKeyName} = props;

    return (
        <>
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
        </>
    );
};
