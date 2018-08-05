import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '@framework/core';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

    public heroes: Hero[] = [];

    constructor(private heroService: HeroService) { }

    public ngOnInit(): void {

        this.getHeroes();
    }

    protected getHeroes(): void {

        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    protected add(name: string): void {

        const hero: Hero = new Hero('', name.trim());

        if (!hero.name) {
            return;
        }

        this.heroService.addHero(hero)
            .subscribe(h => {
                this.heroes.push(h);
            });
    }

    protected delete(hero: Hero): void {

        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
}
