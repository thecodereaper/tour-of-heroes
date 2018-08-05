export class DatabaseConfig {

    public get authKey(): string {

        return process.env.COSMOSDB_AUTH_KEY || 'unknown';
    }

    public get connectionPolicy(): any {

        return {
            EnableEndpointDiscovery: false,
            MaxConcurrentFanoutRequests: 32,
            MaxConnectionLimit: 50,
            MediaRequestTimeout: 5000,
            RequestTimeout: 60000,
            RetryOptions: {
                MaxRetryAttemptsOnThrottledRequests: 9,
                MaxRetryWaitTimeInSeconds: 30,
                maxRetryWaitTime: 30,
            }
        };
    }

    public get database(): string {

        return process.env.COSMOSDB_DATABASE || 'unknown';
    }

    public get host(): string {

        return process.env.COSMOSDB_HOST || 'unknown';
    }
}
