import { SynchronizationStatus } from './synchronizationStatus';
import { LocalizableString } from './localizableString';

export interface SynchronizationWrapper<T> {
    error?: LocalizableString;
    item?: T;
    synchronizationStatus: SynchronizationStatus;
}
