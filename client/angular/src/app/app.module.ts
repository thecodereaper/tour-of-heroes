import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@framework/core';
import { SharedModule } from '@framework/shared';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroDetailComponent,
        HeroSearchComponent,
        HeroesComponent,
        MessagesComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        CoreModule,
        SharedModule
    ]
})
export class AppModule { }
