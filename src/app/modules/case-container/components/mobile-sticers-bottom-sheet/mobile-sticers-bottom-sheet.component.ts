import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngxs/store';
import { CaseStickerConstants } from 'src/app/constants/case-sticker.constants';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseUtilsFunctions } from 'src/app/utils/functions/case-utils.functions';
import { AddCaseSticker } from '../../store/actions/case-container.actions';

@Component({
  selector: 'app-mobile-sticers-bottom-sheet',
  templateUrl: './mobile-sticers-bottom-sheet.component.html',
  styleUrls: ['./mobile-sticers-bottom-sheet.component.scss']
})
export class MobileSticersBottomSheetComponent implements OnInit {
  public appStickers: CaseSticker[];

  constructor(private store: Store, private bottomSheetRef: MatBottomSheetRef<MobileSticersBottomSheetComponent>) {}

  ngOnInit() {
    this.appStickers = CaseStickerConstants.stickers;
  }

  public addCaseSticker(caseSticker: CaseSticker, stickerImg: HTMLImageElement) {
    const caseStickerDispatched = { ...caseSticker };

    caseStickerDispatched.width = stickerImg.width;
    caseStickerDispatched.height = stickerImg.height;
    caseStickerDispatched.bWidth = stickerImg.width;
    caseStickerDispatched.bHeight = stickerImg.height;


    caseStickerDispatched.id = CaseUtilsFunctions.generateComponentId();

    this.store.dispatch(new AddCaseSticker(caseStickerDispatched));
    this.bottomSheetRef.dismiss();
  }
}
