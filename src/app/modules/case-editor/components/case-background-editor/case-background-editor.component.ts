import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AddCaseBackground, UpdateCaseBackground } from 'src/app/modules/case-container/store/actions/case-container.actions';
import { CaseContainerState } from 'src/app/modules/case-container/store/state/case-container.state';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseUtilsFunctions } from 'src/app/utils/functions/case-utils.functions';

@Component({
  selector: 'app-case-background-editor',
  templateUrl: './case-background-editor.component.html',
  styleUrls: ['./case-background-editor.component.scss']
})
export class CaseBackgroundEditorComponent implements OnInit {
  @Select(CaseContainerState.caseBackgrounds)
  public caseBackgrounds$: Observable<CaseBackground[]>;

  backgroundImgPath;
  backgroundImgUrl: string | ArrayBuffer;

  constructor(private store: Store) {}

  ngOnInit() {}

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
    this.backgroundImgPath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.loadImage(reader.result);
    };
  }

  public widthChanged(eventInput, caseBackground: CaseBackground) {
    caseBackground.width = eventInput.target.value;

    this.updateCaseBackground(caseBackground);
  }

  public heightChanged(eventInput, caseBackground: CaseBackground) {
    caseBackground.height = eventInput.target.value;

    this.updateCaseBackground(caseBackground);
  }

  private updateCaseBackground(caseBackground: CaseBackground) {
    this.store.dispatch(new UpdateCaseBackground(caseBackground));
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

  public deleteCaseBackground(caseBackground: CaseBackground) {}
}
