import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateInterface } from '../../shared/redux/state';
import { ConnectionSettingsViewContainer } from '../../connectionStrings/components/connectionSettingsViewContainer';

export const AzureResourcesContainer: React.FC = () => {
       return <ConnectionSettingsViewContainer />;
};
