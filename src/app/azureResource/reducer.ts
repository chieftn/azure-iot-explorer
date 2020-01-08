/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { azureResourceStateInitial, AzureResourceStateInterface } from './state';
import { getAzureResourcesAction, setActiveAzureResourceAction, addAzureResourceAction, removeAzureResourceAction } from './actions';
import { AzureResource } from './models/azureResource';
import { SynchronizationStatus } from '../api/models/synchronizationStatus';
import { LocalizableString } from '../api/models/localizableString';

const reducer = reducerWithInitialState<AzureResourceStateInterface>(azureResourceStateInitial())
    .case(setActiveAzureResourceAction, (state: AzureResourceStateInterface, payload: AzureResource) => {
        const updatedState = {...state};
        updatedState.activeAzureResource = payload;
        return updatedState;
    })

    .case(getAzureResourcesAction.started, (state: AzureResourceStateInterface) => {
        const updatedState = {...state};
        updatedState.azureResources = {
            payload: [],
            synchronizationStatus: SynchronizationStatus.working
        };

        return updatedState;
    })

    .case(getAzureResourcesAction.done, (state: AzureResourceStateInterface, payload: {result: AzureResource[]}) => {
        const updatedState = {...state};
        updatedState.azureResources = {
            payload: payload.result,
            synchronizationStatus: SynchronizationStatus.fetched
        };

        return updatedState;
    })

    .case(getAzureResourcesAction.failed, (state: AzureResourceStateInterface, payload: { error: LocalizableString}) => {
        const updatedState = {...state};
        updatedState.azureResources = {
            error: payload.error,
            payload: [],
            synchronizationStatus: SynchronizationStatus.failed
        };

        return updatedState;
    });

export default reducer;
