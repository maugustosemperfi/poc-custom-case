import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { EditText, UpdateCaseText } from '../case-container/store/actions/case-container.actions';
import { CaseContainerState } from '../case-container/store/state/case-container.state';

@Component({
  selector: 'app-case-text',
  templateUrl: './case-text.component.html',
  styleUrls: ['./case-text.component.scss']
})
export class CaseTextComponent implements OnInit {
  @Input() caseText: CaseText;

  @ViewChild('textInput') textInput: ElementRef;
  public editingText: CaseText;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(CaseContainerState.editedText).subscribe(editingText => {
      this.editingText = editingText;

      if (editingText) {
        console.log(this.textInput);
        setTimeout(() => {
          this.textInput.nativeElement.focus();
        }, 0);
      }
    });
  }

  inputBlur() {
    this.store.dispatch(new EditText(null));
  }

  public textValueChanges(eventInput, caseText: CaseText) {
    caseText.text = eventInput.target.value;

    this.dispatchUpdateAction(caseText);
  }

  private dispatchUpdateAction(caseText: CaseText) {
    this.store.dispatch(new UpdateCaseText(caseText));
  }
}
