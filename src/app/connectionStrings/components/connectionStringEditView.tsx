/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { getConnectionInfoFromConnectionString } from '../../api/shared/utils';
import { generateConnectionStringValidationError } from '../../shared/utils/hubConnectionStringHelper';
import { getResourceNameFromHostName } from '../../api/shared/hostNameUtils';
import { useLocalizationContext } from '../../shared/contexts/localizationContext';
import { ResourceKeys } from '../../../localization/resourceKeys';
import './connectionStringEditView.scss';

const LINES_FOR_CONNECTION = 5;

export interface ConnectionStringEditViewProps {
    connectionStringUnderEdit?: string;
    connectionStrings: string[];
    onDismiss(): void;
    onCommit(newConnectionString: string): void;
}

export const ConnectionStringEditView: React.FC<ConnectionStringEditViewProps> = props => {
    const {connectionStringUnderEdit, connectionStrings, onDismiss, onCommit} = props;
    const [connectionString, setConnectionString] = React.useState<string>(connectionStringUnderEdit);
    const [connectionStringValidationKey, setConnectionStringValidationKey] = React.useState<string>(undefined);
    const [connectionSettings, setConnectionSettings] = React.useState(undefined);
    const [hostName, setHostName] = React.useState<string>(undefined);
    const { t } = useLocalizationContext();

    const onConnectionStringChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
         setConnectionString(newValue);
         validateConnectionString(newValue);
    };

    const onCommitClick = () => {
        onCommit(connectionString);
    };

    const onDismissClick = () => {
        onDismiss();
    };

    const validateConnectionString = (updatedConnectionString: string) => {
        let validationKey = generateConnectionStringValidationError(updatedConnectionString) || '';
        validationKey = connectionStrings.indexOf(updatedConnectionString) >= 0 ?
            ResourceKeys.connectionStrings.editConnection.validations.duplicate :
            validationKey;

        setConnectionStringValidationKey(validationKey);

        if (!validationKey) {
            const extractedConnectionSettings = getConnectionInfoFromConnectionString(updatedConnectionString);
            const extractedHostName = getResourceNameFromHostName(extractedConnectionSettings.hostName);

            setConnectionSettings(extractedConnectionSettings);
            setHostName(extractedHostName);
        }
    };

    const renderHeader = (): JSX.Element => {
        return (
            <h2 className="connection-string-edit-header">
                {connectionStringUnderEdit ?
                    t(ResourceKeys.connectionStrings.editConnection.title.edit) :
                    t(ResourceKeys.connectionStrings.editConnection.title.add)
                }
            </h2>
        );
    };

    const renderFooter = (): JSX.Element => {
        return (
            <div className="connection-string-edit-footer">
                <PrimaryButton
                   text={t(ResourceKeys.connectionStrings.editConnection.save.label)}
                   ariaLabel={t(ResourceKeys.connectionStrings.editConnection.save.ariaLabel)}
                   onClick={onCommitClick}
                   disabled={connectionStringValidationKey !== ''}
                />
                <DefaultButton
                   text={t(ResourceKeys.connectionStrings.editConnection.cancel.label)}
                   ariaLabel={connectionStringUnderEdit ?
                        t(ResourceKeys.connectionStrings.editConnection.cancel.ariaLabel.edit) :
                        t(ResourceKeys.connectionStrings.editConnection.cancel.ariaLabel.add)
                    }
                   onClick={onDismissClick}
                />
            </div>
        );
    };

    return (
        <Panel
            isOpen={true}
            type={PanelType.medium}
            isBlocking={true}
            isFooterAtBottom={true}
            onRenderHeader={renderHeader}
            onRenderFooter={renderFooter}
            onDismiss={onDismiss}
            closeButtonAriaLabel={
                connectionStringUnderEdit ?
                    t(ResourceKeys.connectionStrings.editConnection.cancel.ariaLabel.edit) :
                    t(ResourceKeys.connectionStrings.editConnection.cancel.ariaLabel.add)
            }
        >
            <div className="connection-string-edit-body">
                <TextField
                    ariaLabel={t(ResourceKeys.connectionStrings.editConnection.editField.ariaLabel)}
                    label={t(ResourceKeys.connectionStrings.editConnection.editField.label)}
                    onChange={onConnectionStringChange}
                    multiline={true}
                    rows={LINES_FOR_CONNECTION}
                    errorMessage={t(connectionStringValidationKey)}
                    value={connectionString}
                    required={true}
                />
            </div>
        </Panel>
    );
};
