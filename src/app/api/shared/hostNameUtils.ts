import { AzureResourceIdentifierType } from '../../azureResourceIdentifier/models/azureResourceIdentifierType';
import { AzureResourceHostNameType } from '../../azureResourceIdentifier/models/azureResourceHostNameType';
import { getConnectionInfoFromConnectionString } from './utils';

export const getResourceNameFromHostName = (hostName: string): string | undefined => {
    const hostNameSplit = hostName ? hostName.split('.') : [];
    if (hostNameSplit.length > 0) {
        return hostNameSplit[0];
    }
};

export const getResourceTypeFromHostName = (hostName: string): string | undefined => {
    const hostNameSplit = hostName ? hostName.split('.') : [];
    if (hostNameSplit.length > 1) {
        const type = hostNameSplit[1].toLowerCase();
        if (type === AzureResourceHostNameType.IoTHub.toLowerCase()) {
            return AzureResourceIdentifierType.IoTHub;
        }

        if (type === AzureResourceHostNameType.DeviceProvisioningService.toLowerCase()) {
            return AzureResourceIdentifierType.DeviceProvisioningService;
        }
    }
};

export const tryGetHostNameFromConnectionString = (connectionString: string): string => {
    try {
        const { hostName } = getConnectionInfoFromConnectionString(connectionString);
        return hostName;
    } catch {
        return '';
    }
};
