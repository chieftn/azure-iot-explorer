/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { AzureResource } from './models/azureResource';
import { AzureResourceIdentifier } from './models/azureResourceIdentifier';
import { SynchronizationWrapper } from '../api/models/synchronizationWrapper';
import { SynchronizationStatus } from '../api/models/synchronizationStatus';

export interface AzureResourceStateInterface {
    activeAzureResource?: AzureResource;
    azureResourceIdentifiers: SynchronizationWrapper<AzureResourceIdentifier[]>;
}

export const azureResourceStateInitial = (): AzureResourceStateInterface => {
    return {
        azureResourceIdentifiers: {
            payload: [],
            synchronizationStatus: SynchronizationStatus.initialized
        }
    };
};
