/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateInterface } from '../../shared/redux/state';
import { ConnectionSettingsView } from './connectionSettingsView';

export const ConnectionSettingsViewContainer: React.FC = () => {
    const connectionStrings = useSelector((state: StateInterface) => state.connectionStringsState.connectionStrings);
    const dispatch = useDispatch();

    return (
        <ConnectionSettingsView
            onAddConnectionString={undefined}
            onRemoveConnectionString={undefined}
            connectionStrings={connectionStrings}
        />
    );
};
