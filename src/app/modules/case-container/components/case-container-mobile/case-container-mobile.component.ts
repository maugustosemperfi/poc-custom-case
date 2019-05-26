import { DragDrop, DragRef, DragRefConfig } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseTextConstants } from 'src/app/constants/case-text.constants';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseComponent } from 'src/app/shared/models/case-compoent.model';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { CaseTextFont } from 'src/app/shared/models/csae-text-font.model';
import { CaseUtilsFunctions } from 'src/app/utils/functions/case-utils.functions';
import {
  AddCaseBackground,
  AddCaseText,
  EditText,
  ResetCase,
  SelectCaseBackground,
  SelectCaseSticker,
  SelectCaseText,
  UpdateCaseSticker,
  UpdateCaseText,
  UpdateSelectedComponent
} from '../../store/actions/case-container.actions';
import { CaseContainerState } from '../../store/state/case-container.state';
import { MobilePaletteSheetComponent } from '../mobile-palette-sheet/mobile-palette-sheet.component';
import { MobileSticersBottomSheetComponent } from '../mobile-sticers-bottom-sheet/mobile-sticers-bottom-sheet.component';
import { CasePalette } from 'src/app/shared/models/case-palette.model';

@Component({
  selector: 'app-case-container-mobile',
  templateUrl: './case-container-mobile.component.html',
  styleUrls: ['./case-container-mobile.component.scss']
})
export class CaseContainerMobileComponent implements OnInit {
  @Select(CaseContainerState.caseTexts) caseTexts$: Observable<CaseText[]>;
  @Select(CaseContainerState.caseBackgrounds) caseBackgrounds$: Observable<CaseBackground[]>;
  @Select(CaseContainerState.caseStickers) caseStickers$: Observable<CaseSticker[]>;

  @ViewChild('stickerElement') stickerElement;

  public casePalette: CasePalette;
  public editingText: CaseText;
  public textColors: string[];
  public pinchDistance: string;
  public dragging = false;

  private draggableComponentRef: DragRef = null;
  private caseTextFonts: CaseTextFont[];
  private selectedComponent: CaseComponent;
  private dragRefConfig: DragRefConfig = {
    dragStartThreshold: 0
  } as DragRefConfig;
  constructor(private store: Store, private bottomSheet: MatBottomSheet, private dragDrop: DragDrop) {}

  ngOnInit() {
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

  public dragElement(htmlElement: HTMLElement) {
    if (this.draggableComponentRef === null) {
      this.draggableComponentRef = this.dragDrop.createDrag(htmlElement, this.dragRefConfig);
      this.dragging = true;
    }
  }

  public dragEnd() {

    if (this.draggableComponentRef !== null) {
      this.draggableComponentRef.dispose();
      this.draggableComponentRef = null;
      this.dragging = false;
      console.log(this.dragging);
    }
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

  public editTextColor(textColor, editedText: CaseText) {
    editedText.color = textColor;

    this.updateCaseText(editedText);
  }

  public onPinch(event, caseSticker: CaseSticker) {
    let deltaX = event.deltaX;
    if (deltaX < 0) {
      deltaX = deltaX * 2;
    }

    let deltaY = event.deltaY;
    if (deltaY < 0) {
      deltaY = event.deltaY;
    }

    if (caseSticker.lastX && caseSticker.lastY) {
      if (deltaX + deltaY > caseSticker.lastX + caseSticker.lastY) {
        caseSticker.width = caseSticker.bWidth + caseSticker.bWidth * (event.distance / 50);
        caseSticker.height = caseSticker.bHeight + caseSticker.bHeight * (event.distance / 50);
      } else {
        caseSticker.width = caseSticker.bWidth - caseSticker.bWidth * (event.distance / 50);
        caseSticker.height = caseSticker.bHeight - caseSticker.bHeight * (event.distance / 50);
      }
    }

    caseSticker.lastX = event.deltaX;
    caseSticker.lastY = event.deltaY;

    this.store.dispatch(new UpdateCaseSticker(caseSticker));
  }

  public onPinchEnd(event, caseSticker: CaseSticker) {
    caseSticker.bWidth = caseSticker.width;
    caseSticker.bHeight = caseSticker.height;
    caseSticker.lastX = null;
    caseSticker.lastY = null;

    this.store.dispatch(new UpdateCaseSticker(caseSticker));
  }

  public rotateStickerChanged(event, caseComponent: CaseSticker) {
    caseComponent.rotate = caseComponent.rotate + event.rotation;

    this.store.dispatch(new UpdateCaseSticker(caseComponent));
  }

  public fontSizeChanged(eventInput, editingText: CaseText) {
    const fontSize = eventInput.value;
    editingText.fontSize = fontSize;
    this.store.dispatch(new UpdateCaseText(fontSize));
  }

  public rotateLeft() {
    if (this.selectedComponent.rotate === null) {
      this.selectedComponent.rotate = 0;
    }

    this.selectedComponent.rotate += 90;
    this.updateSelectedComponent();
  }

  public rotateRight() {
    if (this.selectedComponent.rotate === null) {
      this.selectedComponent.rotate = 0;
    }

    this.selectedComponent.rotate -= 90;
    this.updateSelectedComponent();
  }

  public increaseSize() {
    this.selectedComponent.width += this.selectedComponent.width * 0.3;
    this.selectedComponent.height += this.selectedComponent.height * 0.3;

    this.updateSelectedComponent();
  }

  public decreaseSize() {
    this.selectedComponent.width -= this.selectedComponent.width * 0.3;
    this.selectedComponent.height -= this.selectedComponent.height * 0.3;

    this.updateSelectedComponent();
  }

  private updateSelectedComponent() {
    this.store.dispatch(new UpdateSelectedComponent(this.selectedComponent));
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
