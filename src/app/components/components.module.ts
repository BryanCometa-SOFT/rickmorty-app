//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Material
import { MaterialModule } from '../material/material.module';

//Components
import { ButtonComponent } from './button/button.component';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  declarations: [
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
    ToolbarComponent,
    ButtonComponent
  ]
})
export class ComponentsModule { }
