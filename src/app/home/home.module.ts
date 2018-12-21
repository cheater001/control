// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Module
import { MaterialModule } from 'app/material/material.module';

// Containers
import { ControlsComponent } from './containers/controls.container';

// Components
import { OrganizationsTableComponent } from './components/endpoint-form.component';

const routes: Routes = [
  {
    path: '',
    component: ControlsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: [
    ControlsComponent,
    OrganizationsTableComponent,
  ],
})
export class HomeModule {
}
