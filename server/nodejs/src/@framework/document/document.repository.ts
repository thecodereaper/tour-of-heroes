import { DocumentClient, SqlQuerySpec } from 'documentdb';

import { DocumentDatabase } from './document.database';
import { DocumentError } from './document.error';
import { Document } from './document.model';

export class DocumentRepository<T extends Document> {

    private readonly collectionLink: string;
    private readonly documentClient: DocumentClient;

    constructor(documentDatabase: DocumentDatabase, collection: string) {

        this.collectionLink = documentDatabase.getCollectionLink(collection);
        this.documentClient = documentDatabase.getDocumentClient;
    }

    public fetchAll(): Promise<T[]> {

        const query: SqlQuerySpec = {
            parameters: [],
            query: `SELECT * FROM c`
        };

        return this.fetch(query);
    }

    public async findOneById(id: string): Promise<T | undefined> {

        const query: SqlQuerySpec = {
            parameters: [{ name: '@id', value: id }],
            query: `SELECT * FROM c WHERE c.id = @id`
        };

        const documents: T[] = await this.fetch(query);

        return documents.length > 0 ? <T>documents[0] : undefined;
    }

    public create(document: T): Promise<T> {

        return new Promise<T>((resolve, reject) => {

            this.documentClient
                .createDocument<T>(this.collectionLink, document, (error, results) => {

                    if (error) {
                        reject(error);
                    }

                    resolve(<T>results);
                });
        });
    }

    public async update(document: T): Promise<T> {

        const existingDocument: T | undefined = await this.findOneById(document.id);

        if (existingDocument === undefined) {
            throw new DocumentError('Document not found.');
        }

        let updatedDocument: T = document;

        this.documentClient
            .replaceDocument<T>(existingDocument._self, document, (error, result) => {

                if (error) {
                    throw error;
                }

                updatedDocument = <T>result;
            });

        return Promise.resolve(updatedDocument);
    }

    public async delete(document: T): Promise<void> {

        const existingDocument: T | undefined = await this.findOneById(document.id);

        if (existingDocument === undefined) {
            throw new DocumentError('Document not found.');
        }

        this.documentClient
            .deleteDocument(existingDocument._self, {}, (error) => {

                if (error) {
                    throw error;
                }
            });

        return Promise.resolve();
    }

    protected fetch(query: SqlQuerySpec): Promise<T[]> {

        return new Promise<T[]>((resolve, reject) => {

            this.documentClient
                .queryDocuments<T>(this.collectionLink, query)
                .toArray((error, results) => {

                    if (error) {
                        reject(error);
                    }

                    resolve(<T[]>results);
                });
        });
    }
}
