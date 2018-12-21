// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// State
import { EffectsModule } from '@ngrx/effects';
import { SessionEffects } from './effects/session.effects';
import { EndpointEffects } from './effects/endpoint.effects';

// Material
import { MaterialModule } from 'app/material/material.module';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Modules
import { RoutingModule } from 'app/router/routing.module';
import { LayoutModule } from 'app/layout/layout.module';

// Interceptors
import { UrlInterceptor } from './interceptors/url';

// Components
import { AppComponent } from '@core/containers/app.component';
import { NotFoundPageComponent } from '@core/containers/not-found-page.component';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    MaterialModule,
    FlexLayoutModule,

    EffectsModule.forFeature([ EndpointEffects, SessionEffects ]),

    RoutingModule,
    LayoutModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  ],
})
export class CoreModule {
}
