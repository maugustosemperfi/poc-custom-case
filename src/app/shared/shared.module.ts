import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    DragDropModule,
    CommonModule
  ],
  exports: [
    DragDropModule
  ]
})
export class SharedModule { }
