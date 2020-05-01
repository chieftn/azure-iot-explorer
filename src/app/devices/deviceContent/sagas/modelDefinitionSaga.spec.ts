/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import 'jest';
import { select, call, put } from 'redux-saga/effects';
import { SagaIteratorClone, cloneableGenerator } from 'redux-saga/utils';
import { getModelDefinitionSaga, getModelDefinition, getModelDefinitionFromPublicRepo, getModelDefinitionFromDevice, getModelDefinitionFromLocalFile, validateModelDefinitionHelper } from './modelDefinitionSaga';
import * as DigitalTwinService from '../../../api/services/digitalTwinService';
import { addNotificationAction } from '../../../notifications/actions';
import { NotificationType } from '../../../api/models/notification';
import { ResourceKeys } from '../../../../localization/resourceKeys';
import { getModelDefinitionAction } from '../actions';
import { getRepositoryLocationSettingsSelector, getPublicRepositoryHostName, getLocalFolderPath } from '../../../modelRepository/selectors';
import { REPOSITORY_LOCATION_TYPE } from '../../../constants/repositoryLocationTypes';
import { getComponentNameAndInterfaceIdArraySelector } from '../selectors';
import { getActiveAzureResourceConnectionStringSaga } from '../../../azureResource/sagas/getActiveAzureResourceConnectionStringSaga';
import { modelDefinitionCommandName, modelDefinitionInterfaceId } from '../../../constants/modelDefinitionConstants';
import { PUBLIC_REPO_HOSTNAME } from '../../../constants/apiConstants';
import { fetchLocalFile } from '../../../api/services/localRepoService';
import { fetchModelDefinition } from '../../../api/services/publicDigitalTwinsModelRepoService';

describe('modelDefinitionSaga', () => {
    const digitalTwinId = 'device_id';
    const interfaceId = 'interface_id';
    const params = {
        digitalTwinId,
        interfaceId
    };
    const action = getModelDefinitionAction.started(params);
    /* tslint:disable */
    const modelDefinition = {
        "@id": "urn:azureiot:ModelDiscovery:DigitalTwin:1",
        "@type": "Interface",
        "contents": [
            {
                "@type": "Property",
                "name": "modelInformation",
                "displayName": "Model Information",
                "description": "Providing model and optional interfaces information on a digital twin.",
                "schema": {
                    "@type": "Object",
                    "fields": [
                        {
                            "name": "modelId",
                            "schema": "string"
                        },
                        {
                            "name": "interfaces",
                            "schema": {
                                "@type": "Map",
                                "mapKey": {
                                    "name": "name",
                                    "schema": "string"
                                },
                                "mapValue": {
                                    "name": "schema",
                                    "schema": "string"
                                }
                            }
                        }
                    ]
                }
            }
        ],
        "@context": "http://azureiot.com/v1/contexts/Interface.json"
    };
    /* tslint:enable */

    describe('getModelDefinitionSaga', () => {
        let getModelDefinitionSagaGenerator: SagaIteratorClone;

        beforeAll(() => {
            getModelDefinitionSagaGenerator = cloneableGenerator(getModelDefinitionSaga)(action);
        });

        it('fetches the model definition', () => {
            expect(getModelDefinitionSagaGenerator.next()).toEqual({
                done: false,
                value: select(getRepositoryLocationSettingsSelector)
            });

            expect(getModelDefinitionSagaGenerator.next([{
                repositoryLocationType: REPOSITORY_LOCATION_TYPE.Public,

            }]).value).toEqual(
                call(getModelDefinition, action, { repositoryLocationType: REPOSITORY_LOCATION_TYPE.Public })
            );

            expect(getModelDefinitionSagaGenerator.next(modelDefinition).value).toEqual(
                call(validateModelDefinitionHelper, modelDefinition, { repositoryLocationType: REPOSITORY_LOCATION_TYPE.Public })
            );
        });

        it('puts the successful action', () => {
            const success = getModelDefinitionSagaGenerator.clone();
            expect(success.next(true)).toEqual({
                done: false,
                value: put((getModelDefinitionAction.done({
                    params,
                    result: {
                        isModelValid: true,
                        modelDefinition,
                        source: REPOSITORY_LOCATION_TYPE.Public
                    }
                })))
            });

            expect(success.next().done).toEqual(true);
        });

        it('fails on error', () => {
            const failure = getModelDefinitionSagaGenerator.clone();

            expect(failure.throw()).toEqual({
                done: false,
                value: put(addNotificationAction.started({
                    text: {
                        translationKey: ResourceKeys.notifications.getInterfaceModelOnError,
                        translationOptions: {
                            interfaceId: params.interfaceId
                        },
                    },
                    type: NotificationType.error,
                }))
            });

            expect(failure.next()).toEqual({
                done: false,
                value: put(getModelDefinitionAction.failed({
                    error: undefined,
                    params
                }))
            });
            expect(failure.next().done).toEqual(true);
        });
    });

    describe('getModelDefinitionFromPublicRepo ', () => {
        const getModelDefinitionFromPublicRepoGenerator = cloneableGenerator(getModelDefinitionFromPublicRepo)
            (action, {repositoryLocationType: REPOSITORY_LOCATION_TYPE.Public});

        expect(getModelDefinitionFromPublicRepoGenerator.next()).toEqual({
            done: false,
            value: select(getPublicRepositoryHostName)
        });

        expect(getModelDefinitionFromPublicRepoGenerator.next(PUBLIC_REPO_HOSTNAME)).toEqual({
            done: false,
            value: call(fetchModelDefinition, {
                id: params.interfaceId,
                repoServiceHostName: PUBLIC_REPO_HOSTNAME,
                token: ''
            })
        });

        expect(getModelDefinitionFromPublicRepoGenerator.next().done).toEqual(true);
    });

    describe('getModelDefinitionFromDevice ', () => {
        const getModelDefinitionFromDeviceGenerator = cloneableGenerator(getModelDefinitionFromDevice)(action);
        expect(getModelDefinitionFromDeviceGenerator.next()).toEqual({
            done: false,
            value: select(getComponentNameAndInterfaceIdArraySelector)
        });

        const nameAndId = [{
            componentName: 'model_discovery',
            interfaceId: modelDefinitionInterfaceId
        }];
        expect(getModelDefinitionFromDeviceGenerator.next(nameAndId)).toEqual({
            done: false,
            value: call(getActiveAzureResourceConnectionStringSaga)
        });

        expect(getModelDefinitionFromDeviceGenerator.next('connection_string')).toEqual({
            done: false,
            value: call(DigitalTwinService.invokeDigitalTwinInterfaceCommand, {
                commandName: modelDefinitionCommandName,
                componentName: 'model_discovery',
                connectionString: 'connection_string',
                digitalTwinId,
                payload: interfaceId
            })
        });

        expect(getModelDefinitionFromDeviceGenerator.next().done).toEqual(true);
    });

    describe('getModelDefinitionFromLocalFile ', () => {
        const getModelDefinitionFromLocalFolderGenerator = cloneableGenerator(getModelDefinitionFromLocalFile)
            (action);

        expect(getModelDefinitionFromLocalFolderGenerator.next()).toEqual({
            done: false,
            value: select(getLocalFolderPath)
        });

        expect(getModelDefinitionFromLocalFolderGenerator.next('f:/')).toEqual({
            done: false,
            value: call(fetchLocalFile, 'f:', action.payload.interfaceId)
        });

        expect(getModelDefinitionFromLocalFolderGenerator.next().done).toEqual(true);
    });

    describe('getModelDefinition', () => {
        it('getModelDefinition from public repo', () => {
            const getModelDefinitionFromPublicRepoGenerator = cloneableGenerator(getModelDefinition)(action, {repositoryLocationType: REPOSITORY_LOCATION_TYPE.Public});
            expect(getModelDefinitionFromPublicRepoGenerator.next()).toEqual({
                done: false,
                value: call(getModelDefinitionFromPublicRepo, action, {repositoryLocationType: REPOSITORY_LOCATION_TYPE.Public})
            });
            expect(getModelDefinitionFromPublicRepoGenerator.next().done).toEqual(true);
        });

        it('getModelDefinition from device', () => {
            const getModelDefinitionFromDeviceGenerator = cloneableGenerator(getModelDefinition)(action,  {repositoryLocationType: REPOSITORY_LOCATION_TYPE.Device});
            expect(getModelDefinitionFromDeviceGenerator.next()).toEqual({
                done: false,
                value: call(getModelDefinitionFromDevice, action)
            });
            expect(getModelDefinitionFromDeviceGenerator.next().done).toEqual(true);
        });

        it('getModelDefinition from local', () => {
            const getModelDefinitionFromDeviceGenerator = cloneableGenerator(getModelDefinition)(action,  {repositoryLocationType: REPOSITORY_LOCATION_TYPE.Local});
            expect(getModelDefinitionFromDeviceGenerator.next()).toEqual({
                done: false,
                value: call(getModelDefinitionFromLocalFile, action)
            });
            expect(getModelDefinitionFromDeviceGenerator.next().done).toEqual(true);
        });
    });
});
