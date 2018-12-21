// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// State
import { StoreModule } from '@ngrx/store';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './custom-router-serializer';

import { ROUTER_FEATURE_KEY } from './reducers';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: '../home/home.module#HomeModule',
  },
];

@NgModule({
  imports: [
    StoreModule.forFeature(ROUTER_FEATURE_KEY, routerReducer),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_FEATURE_KEY,
    }),
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
})
export class RoutingModule {
}
