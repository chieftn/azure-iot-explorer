import { SynchronizationStatus } from './synchronizationStatus';

export interface SynchronizationWrapper<T> {
    error?: { key: string, interpolation?: object};
    item?: T;
    synchronizationStatus: SynchronizationStatus;
}
