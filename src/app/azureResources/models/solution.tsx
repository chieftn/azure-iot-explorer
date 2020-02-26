/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { Group } from './group';
import { Link } from './link';

export interface Solution {
    groups: Group[];
    links: Link[];
}