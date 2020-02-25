/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import '../../css/resources/_entry.scss';

export interface EntryProps {
    title: string;
}

export const Entry: React.FC<EntryProps> = props => {
    return (
        <g>
            <rect className="entry-rectangle">
                <g/>
            </rect>
        </g>
    );
};
