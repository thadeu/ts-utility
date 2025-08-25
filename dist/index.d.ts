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
declare type SafetryReturnable<E, T> = [unknown?, unknown?];
export declare function safetry<E = Error | any, T = any>(callable: any, options?: TryOptions): SafetryReturnable<E, T>;
export declare function safeTry<E = Error, T = any>(callable: any, options?: TryOptions): any;
export declare function Try(callable: any, options?: TryOptions): any;
