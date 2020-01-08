import * as React from 'react';
import { AzureResource } from '../models/azureResource';

export interface AzureResourceSummary {
    azureResource: AzureResource;
}

export const AzureResourceSummary: React.FC<AzureResourceSummary> = props => {
    return (
        <div>hello world</div>
    );
};
