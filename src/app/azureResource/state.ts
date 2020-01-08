/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { AzureResource } from './models/azureResource';
import { SynchronizationWrapper } from '../api/models/synchronizationWrapper';
import { SynchronizationStatus } from '../api/models/synchronizationStatus';

export interface AzureResourceStateInterface {
    activeAzureResource?: AzureResource;
    azureResources: SynchronizationWrapper<AzureResource[]>;
}

export const azureResourceStateInitial = (): AzureResourceStateInterface => {
    return {
        azureResources: {
            payload: [],
            synchronizationStatus: SynchronizationStatus.initialized
        }
    };
};
