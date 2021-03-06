/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { IconButton, PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';
import { ResourceKeys } from '../../../../../localization/resourceKeys';
import { InterfaceDetailCard, SUBMIT } from '../../../../constants/iconNames';
import { ParsedCommandSchema } from '../../../../api/models/interfaceJsonParserOutput';
import { CommandContent } from '../../../../api/models/modelDefinition';
import { DataForm } from '../../../shared/components/dataForm';
import { InvokeDigitalTwinInterfaceCommandActionParameters } from '../../actions';
import { ErrorBoundary } from '../../../shared/components/errorBoundary';
import { getLocalizedData } from '../../../../api/dataTransforms/modelDefinitionTransform';
import { getSchemaType } from '../../../../shared/utils/jsonSchemaAdaptor';

export interface DeviceCommandDataProps extends CommandSchema {
    collapsed: boolean;
    deviceId: string;
    componentName: string;
}

export interface DeviceCommandDispatchProps {
    handleCollapseToggle: () => void;
    invokeDigitalTwinInterfaceCommand: (parameters: InvokeDigitalTwinInterfaceCommandActionParameters) => void;
}

export interface CommandSchema {
    parsedSchema: ParsedCommandSchema;
    commandModelDefinition: CommandContent;
}

export const DeviceCommandsPerInterfacePerCommand: React.FC<DeviceCommandDataProps & DeviceCommandDispatchProps> = (props: DeviceCommandDataProps & DeviceCommandDispatchProps) => {
    const { t } = useTranslation();
    const { collapsed, deviceId, componentName, commandModelDefinition, parsedSchema, handleCollapseToggle, invokeDigitalTwinInterfaceCommand  } = props;

    const createCollapsedSummary = () => {
        return (
            <header className={`flex-grid-row item-summary ${collapsed ? '' : 'item-summary-uncollapsed'}`} onClick={handleToggleCollapse}>
                {renderCommandName()}
                {renderCommandSchema(true)}
                {renderCommandSchema(false)}
                {renderCommandType()}
                {renderCollapseButton()}
            </header>
        );
    };

    const createUncollapsedCard = () => {
        return (
            <section className={collapsed ? 'item-detail' : 'item-detail item-detail-uncollapsed'}>
                {!collapsed &&
                <>
                    {commandModelDefinition.request ? createForm() :
                        <div className="value-section">
                            <PrimaryButton
                                className="submit-button"
                                onClick={onSubmit(null)}
                                text={t(ResourceKeys.deviceCommands.command.submit)}
                                iconProps={{ iconName: SUBMIT }}
                            />
                        </div>
                    }
                </>
                }
            </section>
        );
    };

    const createForm = () => {
        return (
            <DataForm
                buttonText={ResourceKeys.deviceCommands.command.submit}
                formData={undefined}
                settingSchema={parsedSchema.requestSchema}
                handleSave={onSubmit}
                schema={getCommandSchema(true)}
            />
        );
    };

    const getCommandSchema = (isRequest: boolean) => {
        const schema = isRequest ?
            commandModelDefinition.request :
            commandModelDefinition.response;
        if (!schema) {
            return '--';
        }
        else {
            return getSchemaType(schema.schema);
        }
    };

    const renderCommandName = () => {
        const ariaLabel = t(ResourceKeys.deviceCommands.columns.name);
        let displayName = getLocalizedData(commandModelDefinition.displayName);
        displayName = displayName ? displayName : '--';
        let description = getLocalizedData(commandModelDefinition.description);
        description = description ? description : '--';
        return <div className="col-sm3"><Label aria-label={ariaLabel}>{commandModelDefinition.name} ({displayName} / {description})</Label></div>;
    };

    const renderCommandSchema = (isRequest: boolean) => {
        const ariaLabel = t(ResourceKeys.deviceCommands.columns.type);
        return <div className="col-sm3"><Label aria-label={ariaLabel}>{getCommandSchema(isRequest)}</Label></div>;
    };

    const renderCommandType = () => {
        const ariaLabel = t(ResourceKeys.deviceCommands.columns.schema.request);
        return <div className="col-sm2"><Label aria-label={ariaLabel}>{commandModelDefinition.commandType ? commandModelDefinition.commandType : '--'}</Label></div>;
    };

    const renderCollapseButton = () => {
        return (
        <div className="col-sm1">
            <IconButton
                title={t(collapsed ? ResourceKeys.deviceCommands.command.expand : ResourceKeys.deviceCommands.command.collapse)}
                iconProps={{iconName: collapsed ? InterfaceDetailCard.OPEN : InterfaceDetailCard.CLOSE}}
            />
        </div>);
    };

    const onSubmit = (data: any) => () => { // tslint:disable-line:no-any
        invokeDigitalTwinInterfaceCommand({
            commandName: commandModelDefinition.name,
            commandPayload: data,
            componentName,
            digitalTwinId: deviceId,
            responseSchema: parsedSchema.responseSchema
        });
    };

    const handleToggleCollapse = () => {
        handleCollapseToggle();
    };

    return (
        <article className="list-item" role="listitem">
            <ErrorBoundary error={t(ResourceKeys.errorBoundary.text)}>
                {createCollapsedSummary()}
                {createUncollapsedCard()}
            </ErrorBoundary>
        </article>
    );
};
