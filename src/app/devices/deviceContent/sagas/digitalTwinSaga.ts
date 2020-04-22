/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { call, put } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { fetchDigitalTwin, patchDigitalTwinAndGetResponseCode } from '../../../api/services/digitalTwinService';
import { FetchDigitalTwinParameters, PatchDigitalTwinParameters } from '../../../api/parameters/deviceParameters';
import { getDigitalTwinAction, PatchDigitalTwinActionParameters, patchDigitalTwinAction } from './../actions';
import { getActiveAzureResourceConnectionStringSaga } from '../../../azureResource/sagas/getActiveAzureResourceConnectionStringSaga';
import { addNotificationAction } from '../../../notifications/actions';
import { ResourceKeys } from '../../../../localization/resourceKeys';
import { NotificationType } from '../../../api/models/notification';
import { DataPlaneStatusCode } from '../../../constants/apiConstants';

export function* getDigitalTwinSaga(action: Action<string>) {
    try {
        const parameters: FetchDigitalTwinParameters = {
            connectionString: yield call(getActiveAzureResourceConnectionStringSaga),
            digitalTwinId: action.payload,
        };

        const digitalTwin = yield call(fetchDigitalTwin, parameters);

        yield put(getDigitalTwinAction.done({params: action.payload, result: digitalTwin}));
    } catch (error) {
        yield put(getDigitalTwinAction.failed({params: action.payload, error}));
    }
}

export function* patchDigitalTwinSaga(action: Action<PatchDigitalTwinActionParameters>) {
    try {
        const connectionString = yield call(getActiveAzureResourceConnectionStringSaga);
        const parameters: PatchDigitalTwinParameters = {
            ...action.payload,
            connectionString
        };

        const responseCode = yield call(patchDigitalTwinAndGetResponseCode, parameters);
        const digitalTwin = yield call(fetchDigitalTwin, {connectionString, digitalTwinId: parameters.digitalTwinId});

        if (responseCode === DataPlaneStatusCode.Accepted || responseCode === DataPlaneStatusCode.SuccessLowerBound) {
            yield put(addNotificationAction.started({
                text: {
                    translationKey: responseCode === DataPlaneStatusCode.Accepted ?
                        ResourceKeys.notifications.patchDigitalTwinOnAccept : ResourceKeys.notifications.patchDigitalTwinOnSuccess,
                    translationOptions: {
                        deviceId: action.payload.digitalTwinId
                    },
                },
                type: NotificationType.success
            }));
            yield put(patchDigitalTwinAction.done({params: action.payload, result: digitalTwin}));
        }
        else {
            throw new Error(responseCode);
        }
    } catch (error) {
        yield put(addNotificationAction.started({
            text: {
                translationKey: ResourceKeys.notifications.patchDigitalTwinOnError,
                translationOptions: {
                    deviceId: action.payload.digitalTwinId,
                    error,
                },
            },
            type: NotificationType.error
        }));
        yield put(patchDigitalTwinAction.failed({params: action.payload, error}));
    }
}