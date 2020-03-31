/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StateInterface } from '../../shared/redux/state';
import { upsertConnectionStringAction, deleteConnectionStringAction } from '../actions';
import { ConnectionStringsView } from './connectionStringsView';

export const ConnectionStringsViewContainer: React.FC = () => {
    const connectionStrings = useSelector((state: StateInterface) => state.connectionStringsState.connectionStrings);
    const dispatch = useDispatch();

    const onUpsertConnectionString = (newConnectionString: string, connectionString?: string) => {
        dispatch(upsertConnectionStringAction({newConnectionString, connectionString}));
    };

    const onDeleteConnectionString = (connectionString: string) => {
        dispatch(deleteConnectionStringAction(connectionString));
    };

    return (
        <ConnectionStringsView
            onUpsertConnectionString={onUpsertConnectionString}
            onDeleteConnectionString={onDeleteConnectionString}
            connectionStrings={connectionStrings}
        />
    );
};
