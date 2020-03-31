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
import './connectionStringEditView.scss';

const LINES_FOR_CONNECTION = 5;

export interface ConnectionStringEditViewProps {
    connectionStringUnderEdit?: string;
    connectionStrings: string[];
    onDismiss(): void;
    onCommit(newConnectionString: string): void;
}

export const ConnectionStringEditView: React.FC<ConnectionStringEditViewProps> = props => {
    const {connectionStringUnderEdit, onDismiss, onCommit} = props;
    const [connectionString, setConnectionString] = React.useState<string>(connectionStringUnderEdit);
    const [connectionStringValidationKey, setConnectionStringValidationKey] = React.useState<string>(undefined);
    const [connectionSettings, setConnectionSettings] = React.useState(undefined);
    const [hostName, setHostName] = React.useState<string>(undefined);

    React.useEffect(() => {
        if (connectionStringUnderEdit) {
            validateConnectionString(connectionStringUnderEdit);
        }
    }, []); // tslint:disable-line:align

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
        const validation = generateConnectionStringValidationError(updatedConnectionString) || '';
        // duplicate check here.
        setConnectionStringValidationKey(validation);

        if (!validation) {
            const extractedConnectionSettings = getConnectionInfoFromConnectionString(updatedConnectionString);
            const extractedHostName = getResourceNameFromHostName(extractedConnectionSettings.hostName);

            setConnectionSettings(extractedConnectionSettings);
            setHostName(extractedHostName);
        }
    };

    const renderHeader = (): JSX.Element => {
        return (
            <h2 className="connection-string-edit-header">
                {connectionStringUnderEdit ? 'Edit Connection String' : 'Add Connection String'}
            </h2>
        );
    };

    const renderFooter = (): JSX.Element => {
        return (
            <div className="connection-string-edit-footer">
                <PrimaryButton
                   text="OK"
                   ariaLabel="OK"
                   onClick={onCommitClick}
                   disabled={connectionStringValidationKey !== ''}
                />
                <DefaultButton
                   text="Cancel"
                   ariaLabel="Cancel"
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
            closeButtonAriaLabel={'localizeme'}
        >
            <div className="connection-string-edit-body">
                <TextField
                    ariaLabel="connection string aria label"
                    label="Connection String"
                    onChange={onConnectionStringChange}
                    multiline={true}
                    rows={LINES_FOR_CONNECTION}
                    errorMessage={connectionStringValidationKey}
                    value={connectionString}
                    required={true}
                />
            </div>
        </Panel>
    );
};
