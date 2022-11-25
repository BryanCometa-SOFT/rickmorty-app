//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Material
import { MaterialModule } from '../material/material.module';

//Components
import { TableComponent } from './table-episodes/table.component';
import { ButtonComponent } from './button/button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
    TableComponent,
    ToolbarComponent,
    ButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    TableComponent,
    ToolbarComponent,
    ButtonComponent
  ]
})
export class ComponentsModule { }
