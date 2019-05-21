import { Component, OnInit } from '@angular/core';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseStickerConstants } from 'src/app/constants/case-sticker.constants';

@Component({
  selector: 'app-case-sticker-editor',
  templateUrl: './case-sticker-editor.component.html',
  styleUrls: ['./case-sticker-editor.component.scss']
})
export class CaseStickerEditorComponent implements OnInit {
  public appStickers: CaseSticker[];

  constructor() {}

  ngOnInit() {
    this.appStickers = CaseStickerConstants.stickers;
  }
}
