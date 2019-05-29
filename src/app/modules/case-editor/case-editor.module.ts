import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CaseEditorComponent } from './case-editor.component';
import { CaseBackgroundEditorComponent } from './components/case-background-editor/case-background-editor.component';
import { CasePaletteEditorComponent } from './components/case-palette-editor/case-palette-editor.component';
import { CaseTextEditorComponent } from './components/case-text-editor/case-text-editor.component';
import { CaseStickerEditorComponent } from './components/case-sticker-editor/case-sticker-editor.component';
import { Ng5SliderModule } from 'ng5-slider';

@NgModule({
  declarations: [
    CaseEditorComponent,
    CaseTextEditorComponent,
    CaseBackgroundEditorComponent,
    CasePaletteEditorComponent,
    CaseStickerEditorComponent
  ],
  imports: [CommonModule, FormsModule, FlexLayoutModule, DragDropModule, MaterialModule, Ng5SliderModule],
  exports: [CaseEditorComponent]
})
export class CaseEditorModule {}
