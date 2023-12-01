import { delay, race, isFunction, isAsyncFunction } from '@/Util';
export { delay, race, isAsyncFunction, isFunction };
interface TryOptions {
    max?: number;
    exponential?: number;
    count?: number;
    strict?: boolean;
    timeout?: number;
    onError?: any;
    onRetry?: (count: number, isReached: boolean) => void;
}
export declare function Try(callable: any, options?: TryOptions): any;
