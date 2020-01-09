/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { AzureResourceIdentifierListView, AzureResourceIdentifierListViewProps } from './azureResourceIdentifierListView';
import { AzureResource } from '../models/azureResource';
import { StateInterface } from '../../shared/redux/state';

export type AzureResourceIdentifierListViewContainerProps = RouteComponentProps;
export const AzureResourceIdentifierListViewContainer: React.FC<AzureResourceIdentifierListViewContainerProps> = props => {
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

    const viewProps: AzureResourceIdentifierListViewProps = {
        azureResources,
        getAzureResources,
        navigateToAzureResource,
        setActiveAzureResource
    };

    return <AzureResourceIdentifierListView {...viewProps} />;
};
