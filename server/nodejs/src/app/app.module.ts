import { CoreModule } from '@framework/core';
import { Module } from '@nestjs/common';

import { AppConfig } from '../config';
import { AppModules } from './modules';

@Module({
    imports: [
        CoreModule,
        ...AppModules
    ],
    providers: [
        AppConfig
    ]
})
export class AppModule { }
