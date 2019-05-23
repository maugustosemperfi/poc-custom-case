import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { CaseUtilsFunctions } from 'src/app/utils/functions/case-utils.functions';
import { CasePalette } from '../../shared/models/case-palette.model';
import { MobileSticersBottomSheetComponent } from './components/mobile-sticers-bottom-sheet/mobile-sticers-bottom-sheet.component';
import { AddCaseBackground, SelectCaseBackground, SelectCaseSticker, SelectCaseText, UpdateCaseColor } from './store/actions/case-container.actions';
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

  private draggableComponentRef: DragRef;
  constructor(private store: Store, private bottomSheet: MatBottomSheet, private dragDrop: DragDrop) {}

  ngOnInit() {
    this.setInitialCaseColor();
    this.store.select(CaseContainerState.casePalette).subscribe(casePalette => (this.casePalette = casePalette));
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

  private setInitialCaseColor() {
    this.store.dispatch(new UpdateCaseColor('255, 255, 255'));
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
