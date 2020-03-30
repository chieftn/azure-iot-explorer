/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Button, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import './connectionStringEditView.scss';

export interface ConnectionStringEditViewProps {
    isOpen: boolean;
    connectionStringUnderEdit?: string;
    connectionStrings: string[];
    onDismiss(): void;
    onCommit(newConnectionString: string): void;
}

export const ConnectionStringEditView: React.FC<ConnectionStringEditViewProps> = props => {
    const { isOpen, connectionStringUnderEdit, onDismiss, onCommit} = props;
    const [connectionString, setConnectionString] = React.useState<string>(connectionStringUnderEdit);

    const onConnectionStringChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
         setConnectionString(newValue);
    };

    const onCommitClick = () => {
        onCommit(connectionString);
    };

    const onDismissClick = () => {
        onDismiss();
    };

    const renderHeader = (): JSX.Element => {
        return <div>Header</div>;
    };

    const renderFooter = (): JSX.Element => {
        return (
            <div className="connection-string-edit-footer">
                <PrimaryButton
                   text="OK"
                   ariaLabel="OK"
                   onClick={onCommitClick}
                />
                <Button
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
            <div>
                <TextField
                    ariaLabel="connection string aria label"
                    label="Connection String"
                    onChange={onConnectionStringChange}
                    multiline={true}
                />
            </div>
        </Panel>

    );
};
