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
import { CaseContainerMobileComponent } from './components/case-container-mobile/case-container-mobile.component';
import { GestureConfig } from '@angular/material';
import * as Hammer from 'hammerjs';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Ng5SliderModule } from 'ng5-slider';

export class CustomHammerConfig extends GestureConfig {
  overrides = {
    pan: { direction: Hammer.DIRECTION_ALL },
    pinch: { enable: true },
    rotate: { enable: true }
  } as any;
}

@NgModule({
  declarations: [CaseContainerComponent, MobileSticersBottomSheetComponent, MobilePaletteSheetComponent, CaseContainerMobileComponent],
  imports: [CommonModule, FlexLayoutModule, MaterialModule, CaseTextModule, CaseEditorModule, DragDropModule, Ng5SliderModule],
  exports: [CaseContainerComponent],
  entryComponents: [MobileSticersBottomSheetComponent, MobilePaletteSheetComponent],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ]
})
export class CaseContainerModule {}
