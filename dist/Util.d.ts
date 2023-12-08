export declare const isFunction: (fn: any) => boolean;
export declare const isAsyncFunction: (fn: any) => boolean;
export declare const isPlainRegex: (input: any) => boolean;
export declare const isPlainString: (input: any) => string;
export declare const execute: (o: any, params?: any) => any;
export declare const delay: (ms: any) => Promise<unknown>;
export declare const race: (milliseconds: any, ...promises: any[]) => Promise<any>;
