import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material.module';
import { CaseEditorModule } from '../case-editor/case-editor.module';
import { CaseTextModule } from '../case-text/case-text.module';
import { CaseContainerComponent } from './case-container.component';
import { MobilePaletteSheetComponent } from './components/mobile-palette-sheet/mobile-palette-sheet.component';
import { MobileSticersBottomSheetComponent } from './components/mobile-sticers-bottom-sheet/mobile-sticers-bottom-sheet.component';

@NgModule({
  declarations: [CaseContainerComponent, MobileSticersBottomSheetComponent, MobilePaletteSheetComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, CaseTextModule, CaseEditorModule, DragDropModule],
  exports: [CaseContainerComponent],
  entryComponents: [MobileSticersBottomSheetComponent, MobilePaletteSheetComponent]
})
export class CaseContainerModule {}
