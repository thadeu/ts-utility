import { execute, delay, race, isFunction, isAsyncFunction, isPlainString, isPlainRegex } from '@/Util';
export { delay, race, isAsyncFunction, isFunction, isPlainString, isPlainRegex, execute as Execute };
interface TryOptions {
    max?: number;
    exponential?: number;
    count?: number;
    strict?: boolean;
    timeout?: number;
    onError?: any;
    async?: boolean;
    onRetry?: (count: number, isReached: boolean) => void;
}
export declare function safeTry<E = Error, T = any>(callable: any, options?: TryOptions): [E, T] | any;
export declare function Try(callable: any, options?: TryOptions): any;
