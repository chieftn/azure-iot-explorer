/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { Resource } from './resource';

export interface Group {
    nameKey: string;
    resources: Resource[];
}
