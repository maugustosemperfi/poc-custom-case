import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CaseContainerComponent } from './case-container.component';

@NgModule({
  declarations: [CaseContainerComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [CaseContainerComponent]
})
export class CaseContainerModule {}
