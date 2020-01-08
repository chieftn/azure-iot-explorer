/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import actionCreatorFactory from 'typescript-fsa';
import { SET, GET } from '../constants/actionTypes';
import { AzureResource } from './models/azureResource';
import { LocalizableString } from '../api/models/localizableString';

export const AZURE_RESOURCES = 'AZURE_RESOURCES';
export const ACTIVE = '_ACTIVE';
export const BY_CONNECTION = '_CONNECTION';
export const BY_HOSTNAME = '_HOST';

const actionCreator = actionCreatorFactory(AZURE_RESOURCES);

export interface SetActiveAzureResourceByConnectionStringActionParameters {
    connectionString: string;
    hostName: string;
}

export interface SetActiveAzureResourceByHostNameActionParameters {
    hostName: string;
}

export const getAzureResourcesAction = actionCreator.async<void, AzureResource[], LocalizableString>(GET);
export const setActiveAzureResourceByConnectionStringAction = actionCreator<SetActiveAzureResourceByConnectionStringActionParameters>(`${SET}${ACTIVE}${BY_CONNECTION}`);
export const setActiveAzureResourceByHostNameAction = actionCreator<SetActiveAzureResourceByHostNameActionParameters>(`${SET}${ACTIVE}${BY_HOSTNAME}`);
export const setActiveAzureResourceAction = actionCreator<AzureResource>(`${SET}${ACTIVE}`);
