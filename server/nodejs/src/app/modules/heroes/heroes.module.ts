import { Module } from '@nestjs/common';

import { HeroesController } from './heroes.controller';
import { HeroesRepository } from './heroes.repository';
import { HeroesService } from './heroes.service';

@Module({
    controllers: [
        HeroesController
    ],
    providers: [
        HeroesRepository,
        HeroesService
    ]
})
export class HeroesModule { }
