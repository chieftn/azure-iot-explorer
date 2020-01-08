/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { LocalizableString } from './localizableString';

export enum NotificationType {
    info,
    warning,
    success,
    error,
}

export interface Notification {
    id?: number;
    issued?: string;
    title?: LocalizableString;
    text: LocalizableString;
    type: NotificationType;
}
