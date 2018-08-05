import { Global, Module } from '@nestjs/common';

import { DatabaseConfig } from '../../config';
import { DocumentDatabase } from '../document/document.database';

@Global()
@Module({
    exports: [
        DocumentDatabase
    ],
    providers: [
        DatabaseConfig,
        DocumentDatabase
    ]
})
export class CoreModule { }
