/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import 'jest';
import {
    getActiveAzureResourceSelector,
    getActiveAzureResourceHostNameSelector,
    getActiveAzureResourceConnectionStringSelector
} from './selectors';
import { getInitialState } from '../api/shared/testHelper';
import { SynchronizationStatus } from '../api/models/synchronizationStatus';

describe('getDigitalTwinInterfacePropertiesSelector', () => {
    const state = getInitialState();
    const hostName = 'testhub.azure-devices.net';
    state.azureResourceState = {
        activeAzureResource: {
            accessVerificationState: null,
            hostName
        },
        azureResources: {
            item: [],
            synchronizationStatus: SynchronizationStatus.initialized
        }
    };

    it('returns active azure resource', () => {
        expect(getActiveAzureResourceSelector(state)).toEqual({
            accessVerificationState: null,
            hostName
        });
    });

    it('returns active azure resource', () => {
        expect(getActiveAzureResourceHostNameSelector(state)).toEqual(hostName);
    });

    it('returns active azure connection string', () => {
        expect(getActiveAzureResourceConnectionStringSelector(state)).toEqual('');
    });

});
