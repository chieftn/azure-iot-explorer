/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { takeLatest } from 'redux-saga/effects';
import { setActiveAzureResourceByConnectionStringAction, setActiveAzureResourceByHostNameAction, setActiveAzureResourceAction, getAzureResourcesAction } from './actions';
import { getAzureResourcesSaga } from './sagas/getAzureResourcesSaga';
import { setActiveAzureResourceByConnectionStringSaga } from './sagas/setActiveAzureResourceByConnectionStringSaga';
import { setActiveAzureResourceByHostNameSaga } from './sagas/setActiveAzureResourceByHostNameSaga';
import { setActiveAzureResourceSaga } from './sagas/setActiveAzureResourceSaga';

export default [
    takeLatest(getAzureResourcesAction.started, getAzureResourcesSaga),
    takeLatest(setActiveAzureResourceByConnectionStringAction, setActiveAzureResourceByConnectionStringSaga),
    takeLatest(setActiveAzureResourceByHostNameAction, setActiveAzureResourceByHostNameSaga),
    takeLatest(setActiveAzureResourceAction, setActiveAzureResourceSaga)
];
