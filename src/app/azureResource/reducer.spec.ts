/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { AzureResourceStateInterface } from './state';
import { setActiveAzureResourceAction, getAzureResourcesAction } from './actions';
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

describe('getAzureResourcesAction', () => {
    it('clears payload and sets sync status to working on started', () => {
        const azureResource = {
            accessVerificationState: AccessVerificationState.Authorized,
            hostName: 'hostName'
        };

        const initialState: AzureResourceStateInterface = {
            activeAzureResource: undefined,
            azureResources: {
                payload: [azureResource],
                synchronizationStatus: SynchronizationStatus.initialized
            }
        };

        const action =  getAzureResourcesAction.started();
        const result = reducer(initialState, action);

        expect(result.azureResources.payload).toEqual([]);
        expect(result.azureResources.synchronizationStatus).toEqual(SynchronizationStatus.working);
        expect(result.azureResources.error).toBeUndefined();
    });

    it('sets payload and updates sync status to fetched on done', () => {
        const azureResource = {
            accessVerificationState: AccessVerificationState.Authorized,
            hostName: 'hostName'
        };

        const initialState: AzureResourceStateInterface = {
            activeAzureResource: undefined,
            azureResources: {
                payload: [],
                synchronizationStatus: SynchronizationStatus.initialized
            }
        };

        const action =  getAzureResourcesAction.done({result: [azureResource]});
        const result = reducer(initialState, action);

        expect(result.azureResources.payload).toEqual([azureResource]);
        expect(result.azureResources.synchronizationStatus).toEqual(SynchronizationStatus.fetched);
        expect(result.azureResources.error).toBeUndefined();
    });

    it('sets error and updates sync status to failed', () => {
        const initialState: AzureResourceStateInterface = {
            activeAzureResource: undefined,
            azureResources: {
                payload: [],
                synchronizationStatus: SynchronizationStatus.initialized
            }
        };

        const action =  getAzureResourcesAction.failed({error: { translationKey: 'key' }});
        const result = reducer(initialState, action);

        expect(result.azureResources.payload).toEqual([]);
        expect(result.azureResources.synchronizationStatus).toEqual(SynchronizationStatus.failed);
        expect(result.azureResources.error).toBeUndefined();
    });
});
