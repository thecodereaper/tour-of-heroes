import { AuthOptions, DocumentClient } from 'documentdb';

import { Injectable } from '@nestjs/common';
import { DatabaseConfig } from '../../config';

@Injectable()
export class DocumentDatabase {

    private readonly documentClient: DocumentClient;

    constructor(private readonly databaseConfig: DatabaseConfig) {

        const authOptions: AuthOptions = { masterKey: databaseConfig.authKey };
        this.documentClient = new DocumentClient(databaseConfig.host, authOptions, databaseConfig.connectionPolicy);
    }

    public get getDocumentClient(): DocumentClient {

        return this.documentClient;
    }

    public getCollectionLink(collection: string): string {

        return `dbs/${this.databaseConfig.database}/colls/${collection}`;
    }
}
