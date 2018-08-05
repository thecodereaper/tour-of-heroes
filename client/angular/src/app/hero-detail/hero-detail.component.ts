import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero, HeroService } from '@framework/core';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

    @Input() public hero: Hero | undefined;

    constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) { }

    public ngOnInit(): void {

        this.getHero();
    }

    public getHero(): void {

        this.hero = undefined;
        const id: string | null = this.route.snapshot.paramMap.get('id');

        if (id === null) {
            return;
        }

        this.heroService.getHero(id).subscribe(h => this.hero = h);
    }

    public goBack(): void {

        this.location.back();
    }

    public save(): void {

        if (this.hero === undefined) {
            return;
        }

        this.heroService.updateHero(this.hero)
            .subscribe(() => this.goBack());
    }
}
