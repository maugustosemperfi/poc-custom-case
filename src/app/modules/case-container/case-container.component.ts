import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseTextConstants } from 'src/app/constants/case-text.constants';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { CaseTextFont } from 'src/app/shared/models/csae-text-font.model';
import { CaseUtilsFunctions } from 'src/app/utils/functions/case-utils.functions';
import { CasePalette } from '../../shared/models/case-palette.model';
import { MobilePaletteSheetComponent } from './components/mobile-palette-sheet/mobile-palette-sheet.component';
import { MobileSticersBottomSheetComponent } from './components/mobile-sticers-bottom-sheet/mobile-sticers-bottom-sheet.component';
import { AddCaseBackground, AddCaseText, EditText, ResetCase, SelectCaseBackground, SelectCaseSticker, SelectCaseText, UpdateCaseColor, UpdateCaseText } from './store/actions/case-container.actions';
import { CaseContainerState } from './store/state/case-container.state';

@Component({
  selector: 'app-case-container',
  templateUrl: './case-container.component.html',
  styleUrls: ['./case-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseContainerComponent implements OnInit {
  @Select(CaseContainerState.caseTexts) caseTexts$: Observable<CaseText[]>;
  @Select(CaseContainerState.caseBackgrounds) caseBackgrounds$: Observable<CaseBackground[]>;
  @Select(CaseContainerState.caseStickers) caseStickers$: Observable<CaseSticker[]>;

  public casePalette: CasePalette;
  public editingText: CaseText;

  private draggableComponentRef: DragRef;
  private caseTextFonts: CaseTextFont[];
  constructor(private store: Store, private bottomSheet: MatBottomSheet, private dragDrop: DragDrop) {}

  ngOnInit() {
    this.setInitialCaseColor();
    this.store.select(CaseContainerState.casePalette).subscribe(casePalette => (this.casePalette = casePalette));
    this.store.select(CaseContainerState.editedText).subscribe(editedText => {
      this.editingText = editedText;
    });
    this.caseTextFonts = CaseTextConstants.CASE_TEXT_FONTS;
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

  public openStickersSheet() {
    this.bottomSheet.open(MobileSticersBottomSheetComponent);
  }

  public openPaletteSheet() {
    this.bottomSheet.open(MobilePaletteSheetComponent);
  }

  public addNewText() {
    this.store.dispatch(
      new AddCaseText({
        id: CaseUtilsFunctions.generateComponentId(),
        text: CaseTextConstants.CASE_TEXT_DEFAULT_NAME,
        fontSize: CaseTextConstants.CASE_TEXT_DEFAULT_FONT_SIZE,
        font: CaseTextConstants.CASE_TEXT_DEFAULT_FONT,
        fontLabel: CaseTextConstants.CASE_TEXT_DEFAULT_FONT_LABEL,
        fontIndex: CaseTextConstants.CASE_TEXT_DEFAULT_FONT_INDEX
      } as CaseText)
    );
  }

  public updateCaseText(caseText: CaseText) {
    this.store.dispatch(new EditText(caseText));
  }

  public componentPressed(htmlElement: HTMLElement) {
    this.draggableComponentRef = this.dragDrop.createDrag(htmlElement);
  }

  public componentPressedUp(event) {
    this.draggableComponentRef.dispose();
  }

  public selectedBackgroundFile(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.loadImage(reader.result);
    };
  }

  public resetCase() {
    this.store.dispatch(new ResetCase());
  }

  public updateCaseTextFont(editedText: CaseText) {
    const fontIndex = editedText.fontIndex;

    if (fontIndex < this.caseTextFonts.length - 1) {
      editedText.fontIndex = fontIndex + 1;
      editedText.font = this.caseTextFonts[fontIndex + 1].font;
      editedText.fontLabel = this.caseTextFonts[fontIndex + 1].labelFont;
    } else {
      editedText.fontIndex = CaseTextConstants.CASE_TEXT_DEFAULT_FONT_INDEX;
      editedText.font = CaseTextConstants.CASE_TEXT_DEFAULT_FONT;
      editedText.fontLabel = CaseTextConstants.CASE_TEXT_DEFAULT_FONT_LABEL;
    }

    this.updateCaseText(editedText);
  }

  public doneEditingText() {
    this.store.dispatch(new EditText(null));
  }

  private setInitialCaseColor() {
    this.store.dispatch(new UpdateCaseColor('255, 255, 255'));
  }

  public fontSizeChanged(eventInput, editingText: CaseText) {
    const fontSize = eventInput.value;
    editingText.fontSize = fontSize;
    this.store.dispatch(new UpdateCaseText(fontSize));
  }

  private loadImage(result: string | ArrayBuffer) {
    const image = new Image();
    image.src = result as string;

    image.onload = () => {
      const caseBackground = {
        id: CaseUtilsFunctions.generateComponentId(),
        backgroundImgUrl: result,
        width: image.width,
        height: image.height
      } as CaseBackground;

      this.addCaseBackground(caseBackground);
    };
  }

  private addCaseBackground(caseBackground: CaseBackground) {
    this.store.dispatch(new AddCaseBackground(caseBackground));
  }
}
