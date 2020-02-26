/***********************************************************
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT License
**********************************************************/
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AzureResourcesView } from './azureResourcesView';

export type AzureResourcesViewContainerProps = RouteComponentProps;
export const AzureResourcesViewContainer: React.FC<AzureResourcesViewContainerProps> = props => {
   return (
      <AzureResourcesView />
   );
};
