export declare class TryException extends Error {
    statusCode: number;
    constructor(message: string, statusCode?: number);
}
