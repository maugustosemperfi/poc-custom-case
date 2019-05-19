import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CaseEditorComponent } from './case-editor.component';
import { CaseBackgroundEditorComponent } from './components/case-background-editor/case-background-editor.component';
import { CaseTextEditorComponent } from './components/case-text-editor/case-text-editor.component';

@NgModule({
  declarations: [CaseEditorComponent, CaseTextEditorComponent, CaseBackgroundEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    DragDropModule,
    MaterialModule
  ],
  exports: [CaseEditorComponent]
})
export class CaseEditorModule { }
