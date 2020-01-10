/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { Record } from 'immutable';
import { IM } from '../../shared/types/types';
import { ModelDefinitionWithSourceWrapper } from '../../api/models/modelDefinitionWithSourceWrapper';
import { DeviceIdentity } from '../../api/models/deviceIdentity';
import { SynchronizationWrapper } from '../../api/models/synchronizationWrapper';
import { Twin } from './../../api/models/device';
import { DigitalTwinInterfacePropertiesWrapper } from '../../api/models/digitalTwinInterfacePropertiesWrapper';

export interface DeviceContentStateInterface {
    deviceIdentity: SynchronizationWrapper<DeviceIdentity>;
    deviceTwin: SynchronizationWrapper<Twin>;
    digitalTwinInterfaceProperties: DigitalTwinInterfacePropertiesWrapper;
    interfaceIdSelected: string;
    modelDefinitionWithSource: ModelDefinitionWithSourceWrapper;
}

export const deviceContentStateInitial = Record<DeviceContentStateInterface>({
    deviceIdentity: null,
    deviceTwin: null,
    digitalTwinInterfaceProperties: null,
    interfaceIdSelected: '',
    modelDefinitionWithSource: null
});

export type DeviceContentStateType = IM<DeviceContentStateInterface>;
