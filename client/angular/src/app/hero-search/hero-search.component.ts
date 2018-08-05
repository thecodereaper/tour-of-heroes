import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '@framework/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

    public heroes$: Observable<Hero[]> | undefined;
    private searchTerms: Subject<string> = new Subject<string>();

    constructor(private heroService: HeroService) { }

    protected search(term: string): void {

        this.searchTerms.next(term);
    }

    public ngOnInit(): void {

        this.heroes$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((term: string) => this.heroService.searchHeroes(term)),
        );
    }
}
