/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { AzureResourceIdentifier } from '../models/azureResourceIdentifier';
import { APPLICATION_JSON, HTTP_OPERATION_TYPES } from '../../api/constants';
import { HttpError } from '../../api/models/httpError';

const azureResourceManagementAPIVersion = '2019-06-01';

export interface AzureResourceManagementParameters {
    authorizationToken: string;
    endpoint: string;
}

export interface GetSubscriptionsParameters {
    azureResourceManagementParameters: AzureResourceManagementParameters;
}

export const getSubscriptions = async (parameters: GetSubscriptionsParameters): Promise<string[]> => {
    const { azureResourceManagementParameters } = parameters;
    const { authorizationToken, endpoint } = azureResourceManagementParameters;

    const resourceUrl = `${endpoint}/subscriptions?api-version=${azureResourceManagementAPIVersion}`;
    const serviceRequestParams: RequestInit = {
        headers: new Headers({
            'Accept': APPLICATION_JSON,
            'Authorization': `Bearer ${authorizationToken}`,
            'Content-Type': APPLICATION_JSON
        }),
        method: HTTP_OPERATION_TYPES.Get
    };
    const response = await fetch(resourceUrl, serviceRequestParams);
    if (!response.ok) {
        throw new HttpError(response.status);
    }

    const responseBody = await response.json() as string[];
    return responseBody;
};

export interface GetIotHubResourcesParameters {
    azureResourceManagementParameters: AzureResourceManagementParameters;
    subscriptionIds: string[];
}
export const getIotHubResources = async (parameters: GetIotHubResourcesParameters): Promise<AzureResourceIdentifier[]> => {
    const { azureResourceManagementParameters, subscriptionIds } = parameters;
    const { authorizationToken, endpoint } = azureResourceManagementParameters;

    const resourceUrl = `${endpoint}/providers/Microsoft.ResourcesGraph/resources?api-version=${azureResourceManagementAPIVersion}`;
    const serviceRequestParams: RequestInit = {
        body: JSON.stringify({
            query: `where type =~ 'microsoft.devices/iothubs' | project id, name, type, location, resourceGroup, subscriptionId`,
            subscriptions: subscriptionIds,
        }),
        headers: new Headers({
            'Accept': APPLICATION_JSON,
            'Authorization': `Bearer ${authorizationToken}`,
            'Content-Type': APPLICATION_JSON
        }),
        method: HTTP_OPERATION_TYPES.Get
    };
    const response = await fetch(resourceUrl, serviceRequestParams);
    if (!response.ok) {
        throw new HttpError(response.status);
    }

    const responseBody = await response.json() as AzureResourceIdentifier[];
    return responseBody;
};
