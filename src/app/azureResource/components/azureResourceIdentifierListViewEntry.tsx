import * as React from 'react';
import { AzureResourceIdentifier } from '../models/azureResourceIdentifier';

export interface AzureResourceIdentifierListViewEntryProps {
    azureResourceIdentifier: AzureResourceIdentifier;
}

export const AzureResourceIdentifierListViewEntry: React.FC<AzureResourceIdentifierListViewEntryProps> = props => {
    return (
        <div>hello world</div>
    );
};
