import * as React from 'react';
import { AzureResource } from '../models/azureResource';

export interface AzureResourceListViewEntryProps {
    azureResource: AzureResource;
}

export const AzureResourceListViewEntry: React.FC<AzureResourceListViewEntryProps> = props => {
    return (
        <div>hello world</div>
    );
};
