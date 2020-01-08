/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { AzureResource } from '../models/azureResource';
import { SynchronizationWrapper } from '../../api/models/synchronizationWrapper';
import { AzureResourceSummary } from './azureResourceSummary';

export enum AzureResourcesViewMode {
    Initializing,
    Ready
}

export interface AzureResourcesViewDataProps {
    azureResources: SynchronizationWrapper<AzureResource[]>;
}

export interface AzureResourcesViewActionProps {
    addAzureResource(azureResource: AzureResource): void;
    getAzureResources(): void;
    navigateToAzureResource(azureResource: AzureResource): void;
    removeAzureResource(azureResource: AzureResource): void;
    setActiveAzureResource(azureResource: AzureResource): void;
}

export type AzureResourcesViewProps = AzureResourcesViewDataProps & AzureResourcesViewActionProps;

export const AzureResourcesView: React.FC<AzureResourcesViewProps> = props => {
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
