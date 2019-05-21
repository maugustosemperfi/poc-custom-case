import { Component, OnInit } from '@angular/core';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseStickerConstants } from 'src/app/constants/case-sticker.constants';
import { Store } from '@ngxs/store';
import { AddCaseSticker } from 'src/app/modules/case-container/store/actions/case-container.actions';

@Component({
  selector: 'app-case-sticker-editor',
  templateUrl: './case-sticker-editor.component.html',
  styleUrls: ['./case-sticker-editor.component.scss']
})
export class CaseStickerEditorComponent implements OnInit {
  public appStickers: CaseSticker[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.appStickers = CaseStickerConstants.stickers;
  }

  public addCaseSticker(caseSticker: CaseSticker) {
    this.store.dispatch(new AddCaseSticker(caseSticker));
  }
}
