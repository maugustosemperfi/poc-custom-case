import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseStickerConstants } from 'src/app/constants/case-sticker.constants';
import { AddCaseSticker, DeleteCaseSticker, UpdateCaseSticker } from 'src/app/modules/case-container/store/actions/case-container.actions';
import { CaseContainerState } from 'src/app/modules/case-container/store/state/case-container.state';
import { CaseComponent } from 'src/app/shared/models/case-compoent.model';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseUtilsFunctions } from 'src/app/utils/functions/case-utils.functions';

@Component({
  selector: 'app-case-sticker-editor',
  templateUrl: './case-sticker-editor.component.html',
  styleUrls: ['./case-sticker-editor.component.scss']
})
export class CaseStickerEditorComponent implements OnInit {
  public appStickers: CaseSticker[];
  public caseComponentSelected: CaseComponent;
  @Select(CaseContainerState.caseStickers) public caseStickers$: Observable<CaseSticker[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.appStickers = CaseStickerConstants.stickers;
    this.store.select(CaseContainerState.selectedCaseComponent).subscribe(caseComponent => {
      this.caseComponentSelected = caseComponent;
    });
  }

  public addCaseSticker(caseSticker: CaseSticker, stickerImg: HTMLImageElement) {
    const caseStickerDispatched = { ...caseSticker };

    caseStickerDispatched.width = stickerImg.width;
    caseStickerDispatched.height = stickerImg.height;
    caseStickerDispatched.bWidth = stickerImg.width;
    caseStickerDispatched.bHeight = stickerImg.height;

    caseStickerDispatched.id = CaseUtilsFunctions.generateComponentId();

    this.store.dispatch(new AddCaseSticker(caseStickerDispatched));
  }

  public widthChanged(eventInput, caseSticker: CaseSticker) {
    caseSticker.width = eventInput.target.value;

    this.updateCaseSticker(caseSticker);
  }

  public heightChanged(eventInput, caseSticker: CaseSticker) {
    caseSticker.height = eventInput.target.value;

    this.updateCaseSticker(caseSticker);
  }

  public deleteCaseSticker(caseSticker: CaseSticker) {
    this.store.dispatch(new DeleteCaseSticker(caseSticker));
  }

  public rotateChanged(eventInput, caseSticker: CaseSticker) {
    caseSticker.rotate = eventInput.target.value;

    this.updateCaseSticker(caseSticker);
  }

  private updateCaseSticker(caseSticker: CaseSticker) {
    this.store.dispatch(new UpdateCaseSticker(caseSticker));
  }
}
