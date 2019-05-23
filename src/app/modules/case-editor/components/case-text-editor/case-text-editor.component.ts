import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseTextConstants } from 'src/app/constants/case-text.constants';
import { AddCaseText, DeleteCaseText, OrderCaseText, UpdateCaseText } from 'src/app/modules/case-container/store/actions/case-container.actions';
import { CaseContainerState } from 'src/app/modules/case-container/store/state/case-container.state';
import { CaseComponent } from 'src/app/shared/models/case-compoent.model';
import { CaseTextSize } from 'src/app/shared/models/case-text-size.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { CaseTextFont } from 'src/app/shared/models/csae-text-font.model';

@Component({
  selector: 'app-case-text-editor',
  templateUrl: './case-text-editor.component.html',
  styleUrls: ['./case-text-editor.component.scss']
})
export class CaseTextEditorComponent implements OnInit {
  @Select(CaseContainerState.caseTexts) public caseTexts$: Observable<CaseText[]>;
  public selectedComponent: CaseComponent;
  public fontSizes: CaseTextSize[];
  public fonts: CaseTextFont[];

  constructor(private store: Store) {}

  ngOnInit() {
    this.fontSizes = CaseTextConstants.CASE_TEXT_SIZES;
    this.fonts = CaseTextConstants.CASE_TEXT_FONTS;
    this.store.select(CaseContainerState.selectedCaseComponent).subscribe(selectedComponent => {
      this.selectedComponent = selectedComponent;
    });
  }

  public get textMaxLength() {
    return CaseTextConstants.CASE_TEXT_MAX_LENGTH;
  }

  public addNewText() {
    this.store.dispatch(
      new AddCaseText({
        id: this.generateId(),
        text: CaseTextConstants.CASE_TEXT_DEFAULT_NAME,
        fontSize: CaseTextConstants.CASE_TEXT_DEFAULT_FONT_SIZE,
        fontLabel: CaseTextConstants.CASE_TEXT_DEFAULT_FONT_LABEL
      } as CaseText)
    );
  }

  public textValueChanges(eventInput, caseText: CaseText) {
    caseText.text = eventInput.target.value;

    this.dispatchUpdateAction(caseText);
  }

  public fontSizeValueChanged(eventInput, caseText: CaseText) {
    caseText.fontSize = eventInput.value;

    this.dispatchUpdateAction(caseText);
  }

  public deleteText(caseText: CaseText) {
    this.store.dispatch(new DeleteCaseText(caseText));
  }

  public drop(event: CdkDragDrop<CaseText[]>) {
    this.store.dispatch(new OrderCaseText({ previousIndex: event.previousIndex, newIndex: event.currentIndex }));
  }

  public rotateChanged(eventInput, caseText: CaseText) {
    caseText.rotate = eventInput.target.value;

    this.store.dispatch(new UpdateCaseText(caseText));
  }

  public fontValueChanged(eventInput: CaseTextFont, caseText: CaseText) {
    caseText.font = eventInput.font;
    caseText.fontLabel = eventInput.labelFont;

    this.dispatchUpdateAction(caseText);
  }

  private dispatchUpdateAction(caseText: CaseText) {
    this.store.dispatch(new UpdateCaseText(caseText));
  }

  private generateId() {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
}
