/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { AzureResourceStateInterface } from './state';
import { setActiveAzureResourceAction } from './actions';
import { AzureResource } from './models/azureResource';;
import reducer from './reducer';
import { AccessVerificationState } from './models/accessVerificationState';
import { SynchronizationStatus } from '../api/models/synchronizationStatus';

describe('setActiveAzureResourceAction', () => {
    it('sets entire azure resource', () => {
        const initialState: AzureResourceStateInterface = {
            activeAzureResource: undefined,
            azureResources: {
                payload: [],
                synchronizationStatus: SynchronizationStatus.initialized
            }
        };

        const resource: AzureResource = {
            accessVerificationState: AccessVerificationState.Authorized,
            connectionString: 'connection',
            hostName: 'hostName'
        };
        const action =  setActiveAzureResourceAction(resource);
        const result = reducer(initialState, action);

        expect(result.activeAzureResource).toEqual(resource);
    });
});
