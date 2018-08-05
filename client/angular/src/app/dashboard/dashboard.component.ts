import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '@framework/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public heroes: Hero[] = [];

    constructor(private heroService: HeroService) { }

    public ngOnInit(): void {
        this.getHeroes();
    }

    protected getHeroes(): void {

        this.heroService.getHeroes().subscribe(h => this.heroes = h.slice(1, 5));
    }
}
