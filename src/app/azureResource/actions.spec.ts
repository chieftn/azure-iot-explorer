/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import {
    getAzureResourceIdentifiersAction,
    setActiveAzureResourceAction,
    setActiveAzureResourceByConnectionStringAction,
    SetActiveAzureResourceByConnectionStringActionParameters,
    setActiveAzureResourceByHostNameAction,
    SetActiveAzureResourceByHostNameActionParameters
} from './actions';
import { AzureResource } from './models/AzureResource';
import { AccessVerificationState } from './models/accessVerificationState';

describe('getAzureResourcesActions', () => {
    it('returns AZURE_RESOURCES/GET_IDENTIFIER_STARTED action object on start', () => {
        expect(getAzureResourceIdentifiersAction.started()).toEqual({
            type: 'AZURE_RESOURCES/GET_STARTED'
        });
    });

    it('returns AZURE_RESOURCES/GET_IDENTIFIER_DONE action object on done', () => {
        expect(getAzureResourcesAction.started()).toEqual({
            type: 'AZURE_RESOURCES/GET_DONE'
        });
    });

    it('returns AZURE_RESOURCES/GET_IDENTIFIER_FAILED action object on failed', () => {
        expect(getAzureResourcesAction.started()).toEqual({
            type: 'AZURE_RESOURCES/GET_FAILED'
        });
    });
});

describe('setActiveAzureResourceAction', () => {
    it('returns AZURE_RESOURCES/SET_ACTIVE action object', () => {
        const azureResource: AzureResource = {
            accessVerificationState: AccessVerificationState.Verifying,
            hostName: 'hostName'
        };
        expect(setActiveAzureResourceAction(azureResource)).toEqual({
            payload: azureResource,
            type: 'AZURE_RESOURCES/SET_ACTIVE'
        });
    });
});

describe('setActiveAzureResourceByConnectionStringAction', () => {
    it('returns AZURE_RESOURCES/SET_ACTIVE_CONNECTION action object', () => {
        const parameters: SetActiveAzureResourceByConnectionStringActionParameters = {
            connectionString: 'connectionstring',
            hostName: 'hostName'
        };
        expect(setActiveAzureResourceByConnectionStringAction(parameters)).toEqual({
            payload: parameters,
            type: 'AZURE_RESOURCES/SET_ACTIVE_CONNECTION'
        });
    });
});

describe('setActiveAzureResourceByHostNameAction', () => {
    it('returns AZURE_RESOURCES/SET_ACTIVE_HOST action object', () => {
        const parameters: SetActiveAzureResourceByHostNameActionParameters = {
            hostName: 'hostName'
        };
        expect(setActiveAzureResourceByHostNameAction(parameters)).toEqual({
            payload: parameters,
            type: 'AZURE_RESOURCES/SET_ACTIVE_HOST'
        });
    });
});
