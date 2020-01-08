/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { select, call, put } from 'redux-saga/effects';
import { StateInterface } from '../../shared/redux/state';
import { getAzureResourcesAction } from '../actions';
import { AzureResource } from '../models/azureResource';
import { getConnectionInfoFromConnectionString } from '../../api/shared/utils';
import { AccessVerificationState } from '../models/accessVerificationState';
import { ResourceKeys } from '../../../localization/resourceKeys';

export function* getAzureResourcesSaga() {
    try {
        const connectionStrings = yield select(getConnectionStrings);
        const azureResources = yield call(getAzureResourcesFromConnectionStrings, connectionStrings);
        yield put(getAzureResourcesAction.done(azureResources));
    } catch {
        yield put(getAzureResourcesAction.failed({
            error : {
                translationKey: ResourceKeys.azureResource.errors.unableToGetAzureResources
            }
        }));
    }
}

export const getConnectionStrings = (state: StateInterface): string[] => {
    return state.connectionStringsState.connectionStrings;
};

export const getAzureResourcesFromConnectionStrings = (connectionStrings: string[]): AzureResource[] => {
    const connectionInfoSet = connectionStrings.map(connectionString => {
        const { hostName } = getConnectionInfoFromConnectionString(connectionString);
        return {
            accessVerificationState: AccessVerificationState.Authorized,
            connectionString,
            hostName
        };
    });
    return connectionInfoSet;
};
