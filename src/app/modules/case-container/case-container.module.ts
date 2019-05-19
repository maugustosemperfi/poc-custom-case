import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaseEditorModule } from '../case-editor/case-editor.module';
import { CaseTextModule } from '../case-text/case-text.module';
import { CaseContainerComponent } from './case-container.component';

@NgModule({
  declarations: [CaseContainerComponent],
  imports: [CommonModule, FlexLayoutModule, CaseTextModule, CaseEditorModule, DragDropModule],
  exports: [CaseContainerComponent]
})
export class CaseContainerModule {}