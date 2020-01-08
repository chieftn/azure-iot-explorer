/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { AzureResource } from '../models/azureResource';
import { SynchronizationWrapper } from '../../api/models/synchronizationWrapper';
import { AzureResourceListViewEntry } from './azureResourceListViewEntry';

export enum AzureResourcesViewMode {
    Initializing,
    Ready
}

export interface AzureResourceListViewDataProps {
    azureResources: SynchronizationWrapper<AzureResource[]>;
}

export interface AzureResourceListViewActionProps {
    getAzureResources(): void;
    navigateToAzureResource(azureResource: AzureResource): void;
    setActiveAzureResource(azureResource: AzureResource): void;
}

export type AzureResourceListViewProps = AzureResourceListViewDataProps & AzureResourceListViewActionProps;

export const AzureResourceListView: React.FC<AzureResourceListViewProps> = props => {
    const [ viewMode, setViewMode ] = React.useState<AzureResourcesViewMode>(AzureResourcesViewMode.Initializing);

    React.useEffect(() => {
        props.getAzureResources();
    }, []); // tslint:disable-line:align

    // React.useEffect(() => {
    // }, [props.azureResources]); // tslint:disable-line:align

    return (
        <div>hello world</div>
    );
};
