/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import * as React from 'react';
import '../../css/resources/_group.scss';

export interface GroupProps {
    title: string;
}

export const Group: React.FC<GroupProps> = props => {
    return (
        <g className="group">
            <title>{props.title}</title>
            <rect className="group-rectangle">
                <g/>
            </rect>
        </g>
    );
};
