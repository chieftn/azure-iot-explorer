import { SynchronizationStatus } from './synchronizationStatus';
import { LocalizableString } from './localizableString';

export interface SynchronizationWrapper<T> {
    error?: LocalizableString;
    payload?: T;
    synchronizationStatus: SynchronizationStatus;
}
