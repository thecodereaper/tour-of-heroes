import { Injectable, NotFoundException } from '@nestjs/common';

import { HeroesRepository } from './heroes.repository';
import { ChangeHeroNameCommand, CreateHeroCommand, Hero } from './models';

@Injectable()
export class HeroesService {

    constructor(private readonly heroesRepository: HeroesRepository) { }

    public getAll(): Promise<Hero[]> {

        return this.heroesRepository.fetchAll();
    }

    public getOne(id: string): Promise<Hero | undefined> {

        return this.heroesRepository.findOneById(id);
    }

    public searchByName(name: string): Promise<Hero[]> {

        return this.heroesRepository.findByName(name);
    }

    public create(command: CreateHeroCommand): Promise<Hero> {

        const hero: Hero = new Hero('', command.name);
        return this.heroesRepository.create(hero);
    }

    public async changeName(command: ChangeHeroNameCommand): Promise<Hero> {

        const hero: Hero | undefined = await this.heroesRepository.findOneById(command.id);

        if (hero === undefined) {
            throw new NotFoundException();
        }

        hero.name = command.name;

        return this.heroesRepository.update(hero);
    }

    public async delete(id: string): Promise<void> {

        const hero: Hero | undefined = await this.heroesRepository.findOneById(id);

        if (hero === undefined) {
            throw new NotFoundException();
        }

        return this.heroesRepository.delete(hero);
    }
}
