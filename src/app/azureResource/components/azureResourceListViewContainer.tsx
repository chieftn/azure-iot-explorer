/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AzureResourceListView, AzureResourceListViewProps } from './azureResourceListView';
import { AzureResource } from '../models/azureResource';
import { StateInterface } from '../../shared/redux/state';

export type AzureResourcesViewContainerProps = RouteComponentProps;
export const AzureResourceViewContainer: React.FC<AzureResourcesViewContainerProps> = props => {
    const azureResources = useSelector((state: StateInterface) => state.azureResourceState.azureResources);
    const dispatch = useDispatch();

    const getAzureResources = () => {
        throw Error('not implemented');
    };

    const navigateToAzureResource = (azureResource: AzureResource) => {
        throw Error('not implemented');
    };

    const setActiveAzureResource = (azureResource: AzureResource) => {
        throw Error('not implemented');
    };

    const viewProps: AzureResourceListViewProps = {
        azureResources,
        getAzureResources,
        navigateToAzureResource,
        setActiveAzureResource
    };

    return <AzureResourceListView {...viewProps} />;
};
