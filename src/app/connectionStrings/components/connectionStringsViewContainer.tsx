/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateInterface } from '../../shared/redux/state';
import { ConnectionStringsView } from './connectionStringsView';

export const ConnectionStringsViewContainer: React.FC = () => {
    const connectionStrings = useSelector((state: StateInterface) => state.connectionStringsState.connectionStrings);
    const dispatch = useDispatch();

    return (
        <ConnectionStringsView
            onAddConnectionString={undefined}
            onRemoveConnectionString={undefined}
            connectionStrings={connectionStrings}
        />
    );
};
