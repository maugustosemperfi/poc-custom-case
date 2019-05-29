import { DragDrop, DragRef, DragRefConfig } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
  UpdateSelectedComponent,
  UpdatePinchedComponent
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
  @ViewChild('componentsContainer') componentsContainer: ElementRef;

  public casePalette: CasePalette;
  public editingText: CaseText;
  public textColors: string[];
  public pinchDistance: string;
  public dragging = false;
  public disableDragging = false;
  public test;

  private draggableComponentRef: DragRef = null;
  private caseTextFonts: CaseTextFont[];
  private selectedComponent: CaseComponent;
  private dragRefConfig: DragRefConfig = {
    dragStartThreshold: 0
  } as DragRefConfig;
  pinchZoomOrigin: { x: number; y: number };
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
        fontIndex: CaseTextConstants.CASE_TEXT_DEFAULT_FONT_INDEX,
        discriminator: 'CASETEXT'
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

  public pinchStart(eventPinchStart, htmlElement, caseComponent: CaseComponent) {
    this.disableDragging = true;
    const x = eventPinchStart.center.x;
    const y = eventPinchStart.center.y;
    this.pinchZoomOrigin = this.getRelativePosition(htmlElement, x, y, caseComponent);

    this.updatePinchedComponent(caseComponent);
  }

  public pinch(eventPinch, caseComponent: CaseComponent) {
    const d = this.scaleFrom(this.pinchZoomOrigin, caseComponent.lastZ, caseComponent.lastZ * eventPinch.scale, caseComponent);
    caseComponent.currentX = d.x + caseComponent.lastX + eventPinch.deltaX;
    caseComponent.currentY = d.y + caseComponent.lastY + eventPinch.deltaY;
    caseComponent.currentZ = d.z + caseComponent.lastZ;
    caseComponent.height = caseComponent.bHeight * caseComponent.currentZ;
    caseComponent.width = caseComponent.bWidth * caseComponent.currentZ;

    this.updatePinchedComponent(caseComponent);
  }

  public pinchEnd(caseComponent: CaseComponent) {
    caseComponent.lastX = caseComponent.currentX;
    caseComponent.lastY = caseComponent.currentY;
    caseComponent.lastZ = caseComponent.currentZ;
    this.disableDragging = false;
    this.updatePinchedComponent(caseComponent);
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

  public rotateElement(rotateEvent, caseComponent: CaseComponent) {
    if (caseComponent.lastRotate && rotateEvent.velocity !== 0) {
      let rotation;
      if (rotateEvent.velocity > 0) {
        if (rotateEvent.rotation < 0) {
          rotation = rotateEvent.rotation * -1;
        } else {
          rotation = rotateEvent.rotation;
        }
        caseComponent.rotate = caseComponent.lastRotate + rotation;
      } else {
        if (rotateEvent.rotation > 0) {
          rotation = rotateEvent.rotation * -1;
        } else {
          rotation = rotateEvent.rotation;
        }

        caseComponent.rotate = caseComponent.lastRotate - rotation;
      }
    }
    caseComponent.lastRotate = rotateEvent.rotation;

    this.updatePinchedComponent(caseComponent);
  }

  public itemDropped(droppedEvent) {}

  private updateSelectedComponent() {
    this.store.dispatch(new UpdateSelectedComponent(this.selectedComponent));
  }

  private loadImage(result: string | ArrayBuffer) {
    const image = new Image();
    image.src = result as string;

    image.onload = () => {
      let imgWidth;
      let imgHeight;
      if (image.width > this.componentsContainer.nativeElement.offsetWidth) {
        imgHeight = image.height / (image.width / this.componentsContainer.nativeElement.offsetWidth);
        imgWidth = this.componentsContainer.nativeElement.offsetWidth;
      } else {
        imgWidth = image.width;
        imgHeight = image.height;
      }
      const caseBackground = {
        id: CaseUtilsFunctions.generateComponentId(),
        backgroundImgUrl: result,
        width: imgWidth,
        height: imgHeight,
        discriminator: 'CASEBACKGROUND'
      } as CaseBackground;

      this.addCaseBackground(caseBackground);
    };
  }

  private addCaseBackground(caseBackground: CaseBackground) {
    this.store.dispatch(new AddCaseBackground(caseBackground));
  }

  private scaleFrom(zoomOrigin, currentScale, newScale, caseComponent: CaseComponent) {
    const currentShift = this.getCoordinateShiftDueToScale(caseComponent, currentScale);
    const newShift = this.getCoordinateShiftDueToScale(caseComponent, newScale);
    const zoomDistance = newScale - currentScale;

    const shift = {
      x: currentShift.x - newShift.x,
      y: currentShift.y - newShift.y
    };
    const output = {
      x: zoomOrigin.x * shift.x,
      y: zoomOrigin.y * shift.y,
      z: zoomDistance
    };
    return output;
  }

  private getCoordinateShiftDueToScale(caseComponent: CaseComponent, scale) {
    const newWidth = scale * caseComponent.bWidth;
    const newHeight = scale * caseComponent.bHeight;
    const dx = (newWidth - caseComponent.bWidth) / 2;
    const dy = (newHeight - caseComponent.bHeight) / 2;
    return {
      x: dx,
      y: dy
    };
  }

  private getCoords(elem) {
    // crossbrowser version
    const box = elem.getBoundingClientRect();
    const body = document.body;
    const docEl = document.documentElement;
    const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;
    return { x: Math.round(left), y: Math.round(top) };
  }

  private getRelativePosition(element, x, y, caseComponent: CaseComponent) {
    const domCoords = this.getCoords(element);
    const elementX = x - domCoords.x;
    const elementY = y - domCoords.y;
    const relativeX = elementX / ((caseComponent.bWidth * caseComponent.currentZ) / 2) - 1;
    const relativeY = elementY / ((caseComponent.bHeight * caseComponent.currentZ) / 2) - 1;
    return { x: relativeX, y: relativeY };
  }

  private updatePinchedComponent(caseComponent: CaseComponent) {
    this.store.dispatch(new UpdatePinchedComponent(caseComponent));
  }

  public exportToImage(htmlElement: HTMLElement) {
    CaseUtilsFunctions.exportCase(htmlElement, true);
  }
}
