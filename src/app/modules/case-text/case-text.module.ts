import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaseTextComponent } from './case-text.component';

@NgModule({
  declarations: [CaseTextComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    CaseTextComponent
  ]
})
export class CaseTextModule { }
