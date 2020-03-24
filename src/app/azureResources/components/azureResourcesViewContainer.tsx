/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { ApplicationFrame } from '../../shared/components/applicationFrame';
import { AzureResourcesView } from './azureResourcesView';

export const AzureResourcesViewContainer: React.FC = () => {
    return (
        <ApplicationFrame>
            <AzureResourcesView />
        </ApplicationFrame>
    );
};
