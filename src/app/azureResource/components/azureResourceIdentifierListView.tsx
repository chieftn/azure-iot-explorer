/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { AzureResource } from '../models/azureResource';
import { SynchronizationWrapper } from '../../api/models/synchronizationWrapper';
import { AzureResourceIdentifierListViewEntry } from './azureResourceIdentifierListViewEntry';

export enum AzureResourceIdentifierListViewMode {
    Initializing,
    Ready
}

export interface AzureResourceIdentifierListViewDataProps {
    azureResources: SynchronizationWrapper<AzureResource[]>;
}

export interface AzureResourceIdentifierListViewActionProps {
    getAzureResourceIdentifiers(): void;
    navigateToAzureResource(azureResourceIdentifier: AzureResource): void;
    setActiveAzureResource(azureResourceIdentifier: AzureResource): void;
}

export type AzureResourceIdentifierListViewProps = AzureResourceIdentifierListViewDataProps & AzureResourceIdentifierListViewActionProps;

export const AzureResourceIdentifierListView: React.FC<AzureResourceIdentifierListViewProps> = props => {
    const [ viewMode, setViewMode ] = React.useState<AzureResourceIdentifierListViewMode>(AzureResourceIdentifierListViewMode.Initializing);

    React.useEffect(() => {
        props.getAzureResourceIdentifiers();
    }, []); // tslint:disable-line:align

    // React.useEffect(() => {
    // }, [props.azureResources]); // tslint:disable-line:align

    return (
        <div>hello world</div>
    );
};
