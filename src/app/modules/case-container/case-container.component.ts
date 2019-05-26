import { DragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseTextConstants } from 'src/app/constants/case-text.constants';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseComponent } from 'src/app/shared/models/case-compoent.model';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { CaseTextFont } from 'src/app/shared/models/csae-text-font.model';
import { CasePalette } from '../../shared/models/case-palette.model';
import { UpdateCaseColor, SelectCaseText, SelectCaseBackground, SelectCaseSticker } from './store/actions/case-container.actions';
import { CaseContainerState } from './store/state/case-container.state';

@Component({
  selector: 'app-case-container',
  templateUrl: './case-container.component.html',
  styleUrls: ['./case-container.component.scss']
})
export class CaseContainerComponent implements OnInit {
  @Select(CaseContainerState.caseTexts) caseTexts$: Observable<CaseText[]>;
  @Select(CaseContainerState.caseBackgrounds) caseBackgrounds$: Observable<CaseBackground[]>;
  @Select(CaseContainerState.caseStickers) caseStickers$: Observable<CaseSticker[]>;

  public casePalette: CasePalette;
  public editingText: CaseText;
  public textColors: string[];
  public pinchDistance: string;

  private selectedComponent: CaseComponent;
  private caseTextFonts: CaseTextFont[];
  constructor(private store: Store, private bottomSheet: MatBottomSheet, private dragDrop: DragDrop) {}

  ngOnInit() {
    this.setInitialCaseColor();
    this.store.select(CaseContainerState.casePalette).subscribe(casePalette => (this.casePalette = casePalette));
    this.store.select(CaseContainerState.editedText).subscribe(editedText => {
      this.editingText = editedText;
    });
    this.store.select(CaseContainerState.selectedCaseComponent).subscribe(selectedComponent => {
      this.selectedComponent = selectedComponent;
    });
    this.caseTextFonts = CaseTextConstants.CASE_TEXT_FONTS;
    this.textColors = CaseTextConstants.CASE_TEXT_COLORS;
  }

  public selectCaseText(caseText: CaseText) {
    this.store.dispatch(new SelectCaseText(caseText));
  }

  public selectCaseBackground(caseBackground: CaseBackground) {
    this.store.dispatch(new SelectCaseBackground(caseBackground));
  }

  public selectCaseSticker(caseSticker: CaseSticker) {
    this.store.dispatch(new SelectCaseSticker(caseSticker));
  }

  private setInitialCaseColor() {
    this.store.dispatch(new UpdateCaseColor('255, 255, 255'));
  }
}
