/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
export enum LinkType {
    dps,
    route
}

export interface Link {
    type: LinkType;
    start: number;
    end: number;
    text: string;
}
