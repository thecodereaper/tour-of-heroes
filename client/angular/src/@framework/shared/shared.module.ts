import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        //FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        PipesModule
    ],
    exports: [
        CommonModule,
        DirectivesModule,
        //FlexLayoutModule,
        FormsModule,
        HttpClientModule,
        PipesModule
    ]
})
export class SharedModule { }
