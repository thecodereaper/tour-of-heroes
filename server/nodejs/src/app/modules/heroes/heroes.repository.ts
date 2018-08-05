import { DocumentDatabase, DocumentRepository } from '@framework/document';
import { Injectable } from '@nestjs/common';

import { Hero } from './models';

@Injectable()
export class HeroesRepository extends DocumentRepository<Hero> {

    constructor(documentDatabase: DocumentDatabase) {
        super(documentDatabase, 'Heroes');
    }

    public findByName(name: string): Promise<Hero[]> {

        return this.fetch({
            parameters: [{ name: '@name', value: name }],
            query: `SELECT * FROM c where CONTAINS(lower(c.name), lower(@name))`
        });
    }
}
