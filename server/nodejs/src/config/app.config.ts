export class AppConfig {

    public get apiDescription(): string {

        return process.env.API_DESCRIPTION || 'API Description';
    }

    public get apiDocumentPath(): string {

        return process.env.API_DOCUMENT_PATH || 'docs';
    }

    public get apiRoutePrefix(): string {

        return process.env.API_ROUTE_PREFIX || 'api';
    }

    public get apiTitle(): string {

        return process.env.API_TITLE || 'API Title';
    }

    public get apiVersion(): string {

        return process.env.API_VERSION || 'API Version';
    }

    public get environment(): string {

        return process.env.NODE_ENV || 'unknown';
    }

    public get port(): number {

        return Number(process.env.PORT) || 3000;
    }
}
