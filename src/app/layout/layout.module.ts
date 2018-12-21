// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// State
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LayoutEffects } from './effects/layout.effects';
import { reducers, LAYOUT_FEATURE_KEY } from './reducers';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// Modules
import { MaterialModule } from 'app/material/material.module';

// Containers
import { LayoutComponent } from './containers/layout.container';

// Components
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NavbarComponent } from './components/nav-bar/navbar.component';
import { NavItemComponent } from './components/nav-item/nav-item';
import { NavGroupItemComponent } from './components/nav-group-item/nav-group-item.component';
import { NavGroupTitleComponent } from './components/nav-group-title/nav-group-title.component';
import { NavGroupListComponent } from './components/nav-group-list/nav-group-list.component';

const COMPONENTS = [
  LayoutComponent,
  SideNavComponent,
  NavbarComponent,
  NavItemComponent,
  NavGroupItemComponent,
  NavGroupTitleComponent,
  NavGroupListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forFeature(LAYOUT_FEATURE_KEY, reducers),
    EffectsModule.forFeature([ LayoutEffects ]),
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS,
  ],
})
export class LayoutModule {
}
