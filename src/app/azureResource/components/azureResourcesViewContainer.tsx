/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { addConnectionStringAction, deleteConnectionStringAction } from '../../connectionStrings/actions';
import { AzureResourcesView, AzureResourcesViewProps } from './azureResourcesView';
import { AzureResource } from '../models/azureResource';

export type AzureResourcesViewContainerProps = RouteComponentProps;
export const AzureResourceViewContainer: React.FC<AzureResourcesViewContainerProps> = props => {
    const dispatch = useDispatch();

    const addAzureResource = (azureResource: AzureResource) => {
        dispatch(addConnectionStringAction(azureResource.connectionString));
    };

    const getAzureResources = () => {
        throw Error('not implemented');
    }

    const navigateToAzureResource = (azureResource: AzureResource) => {
        throw Error('not implemented');
    };



    const removeAzureResource = (azureResource: AzureResource) => {
        dispatch(deleteConnectionStringAction(azureResource.connectionString));
    };

    const viewProps: AzureResourcesViewProps = {
        addAzureResource,
        azureResources,
        getAzureResources,
        navigateToAzureResource,
        removeAzureResource,

    };

    return <AzureResourcesView {...viewProps} />;
};
