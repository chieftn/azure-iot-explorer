/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import 'jest';
import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { ActionButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import DeviceSettingsPerInterfacePerSetting, { DeviceSettingDataProps, DeviceSettingDispatchProps } from './deviceSettingsPerInterfacePerSetting';
import { mountWithLocalization } from '../../../../shared/utils/testHelpers';
import { PropertyContent } from '../../../../api/models/modelDefinition';
import { ParsedJsonSchema } from '../../../../api/models/interfaceJsonParserOutput';
import DataForm from '../shared/dataForm';
import { InterfaceDetailCard, INFO } from '../../../../constants/iconNames';

describe('components/devices/deviceSettingsPerInterfacePerSetting', () => {
    const name = 'state';
    const description = 'The state of the device. Two states online/offline are available.';
    const displayName = 'Device State';
    const handleCollapseToggle = jest.fn();
    let schema = 'boolean';
    let twinValue: any = true;  // tslint:disable-line:no-any

    const propertyModelDefinition: PropertyContent = {
        '@type': 'Property',
        'description': description,
        'displayName': displayName,
        'name': name,
        'schema': schema
    };

    const propertySchema: ParsedJsonSchema = {
        default: false,
        description: 'Device State / The state of the device. Two states online/offline are available.',
        required: null,
        title: name,
        type: schema
    };

    const handleOverlayToggle = jest.fn();
    const deviceSettingDispatchProps: DeviceSettingDispatchProps = {
        handleCollapseToggle,
        handleOverlayToggle,
        patchDigitalTwin: jest.fn()
    };

    let deviceSettingDataProps: DeviceSettingDataProps = {
        collapsed: true,
        componentName: 'sensor',
        deviceId: 'deviceId',
        interfaceId: 'urn:interfaceId',
        // tslint:disable-next-line: no-any
        metadata: {desiredValue: twinValue} as any,
        reportedTwin: twinValue,
        settingModelDefinition: propertyModelDefinition,
        settingSchema: propertySchema};

    it('renders when there is a writable property of simple type without sync status', () => {
        const props = {
            ...deviceSettingDataProps,
            ...deviceSettingDispatchProps
        };

        const wrapper = mountWithLocalization(
            <DeviceSettingsPerInterfacePerSetting {...props}/>
        );

        const nameLabel = wrapper.find(Label).first();
        expect((nameLabel.props().children as any).join('')).toEqual(`${name} (${displayName} / ${description})`);  // tslint:disable-line:no-any

        const schemaLabel = wrapper.find(Label).at(1);
        expect(schemaLabel.props().children).toEqual(schema);

        const valueLabel = wrapper.find(Label).at(3); // tslint:disable-line:no-magic-numbers
        expect(valueLabel.props().children).toEqual('true');
    });

    it('renders when there is a writable property of complex type with sync status', () => {
        schema = 'Object';
        twinValue = {
            test: 'value'
        };
        propertyModelDefinition.schema = {
            '@type': schema,
            'fields': []
        };
        propertySchema.type = schema;
        const ackCode = 200;
        const ackDescription = 'ackDescription';
        deviceSettingDataProps = {
            ...deviceSettingDataProps,
            collapsed: false,
            // tslint:disable-next-line: no-any
            metadata: { ackCode, ackDescription, desiredValue: twinValue } as any,
            reportedTwin: twinValue,
            settingModelDefinition: propertyModelDefinition,
            settingSchema: propertySchema
        };

        const props = {
            ...deviceSettingDataProps,
            ...deviceSettingDispatchProps
        };

        const wrapper = mountWithLocalization(
            <DeviceSettingsPerInterfacePerSetting {...props}/>
        );

        const nameLabel = wrapper.find(Label).first();
        expect((nameLabel.props().children as any).join('')).toEqual(`${name} (${displayName} / ${description})`);  // tslint:disable-line:no-any

        const schemaLabel = wrapper.find(Label).at(1);
        expect(schemaLabel.props().children).toEqual(schema);

        const complexValueButton = wrapper.find(ActionButton).first();
        expect(complexValueButton.props().className).toEqual('column-value-button');
        complexValueButton.props().onClick(null);
        expect(handleOverlayToggle).toBeCalled();

        const reportedStatus = wrapper.find(Stack);
        expect(reportedStatus.props().children[1].props.children).toEqual(`(${ackCode} ${ackDescription})`);
        const form = wrapper.find(DataForm);
        expect(form.props().formData).toEqual(twinValue);

        const toggleButtons = wrapper.find(IconButton);
        expect(toggleButtons.first().props().iconProps).toEqual({iconName: InterfaceDetailCard.CLOSE});

        const header = wrapper.find('header');
        header.props().onClick(null);
        expect(handleCollapseToggle).toBeCalled();
    });
});
