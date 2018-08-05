import { NgModule, Optional, SkipSelf } from '@angular/core';

import { InterceptorsModule } from './interceptors/interceptors.module';
import { ServicesModule } from './services/services.module';

@NgModule({
    imports: [
        InterceptorsModule,
        ServicesModule
    ],
    exports: [
        InterceptorsModule,
        ServicesModule
    ]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

        if (parentModule) {
            throw new Error(`CoreModule has already been loaded. Import Core modules in the AppModule only.`);
        }
    }
}
