import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpProgressEvent, HttpResponse, HttpSentEvent, HttpUserEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Hero } from './hero.model';
import { MessageService } from './message.service';

const httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class HeroService {

    private heroesUrl: string = `${environment.baseApiUrl}/heroes`;

    constructor(private httpClient: HttpClient, private messageService: MessageService) { }

    public getHeroes(): Observable<Hero[]> {

        return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
            tap(() => this.log('fetched heroes')),
            catchError(this.handleError('getHeroes', []))
        );
    }

    public getHero(id: string): Observable<Hero> {

        const url: string = `${this.heroesUrl}/${id}`;

        return this.httpClient.get<Hero>(url).pipe(
            tap(() => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    public searchHeroes(term: string): Observable<Hero[]> {

        if (!term.trim()) {
            return of([]);
        }

        return this.httpClient.get<Hero[]>(`${this.heroesUrl}/search/${term}`).pipe(
            tap(_ => this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<Hero[]>('searchHeroes', []))
        );
    }

    public addHero(hero: Hero): Observable<Hero> {

        return this.httpClient.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
            tap((h: Hero) => this.log(`added hero w/ id=${h.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        );
    }

    public deleteHero(hero: Hero | string):
        Observable<Hero | HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<Hero> | HttpUserEvent<Hero>> {

        const id: string = typeof hero === 'string' ? hero : hero.id;
        const url: string = `${this.heroesUrl}/${id}`;

        return this.httpClient.delete<Hero>(url, httpOptions).pipe(
            tap(() => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        );
    }

    public updateHero(hero: Hero): Observable<any> {

        const url: string = `${this.heroesUrl}/${hero.id}`;

        return this.httpClient.put(url, hero, httpOptions).pipe(
            tap(() => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
        );
    }

    private handleError<T>(operation: string = 'operation', result?: T): any {

        return (error: any): Observable<T> => {

            console.error(error);
            this.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

    private log(message: string): void {

        this.messageService.add(`HeroService: ${message}`);
    }
}
