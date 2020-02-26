/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
export interface Resource {
    type: string;
    name: string;
    architectMessage?: string;
    architectLocation?: string;
    operatorKPI?: string;
    operatorKPIMessage?: string;
    financeKPI?: string;
    financeKPIMessage?: string;
}
