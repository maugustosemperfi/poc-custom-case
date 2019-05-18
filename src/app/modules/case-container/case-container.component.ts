import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { AddCaseText } from './store/actions/case-container.actions';
import { CaseContainerState } from './store/state/case-container.state';

@Component({
  selector: 'app-case-container',
  templateUrl: './case-container.component.html',
  styleUrls: ['./case-container.component.scss']
})
export class CaseContainerComponent implements OnInit {
  @Select(CaseContainerState.caseTexts) caseTexts$: Observable<CaseText[]>;

  constructor(private store: Store) {}

  ngOnInit() {}

  addNewText() {
    this.store.dispatch(new AddCaseText({
      id: this.generateId()
    } as CaseText));
  }

  private generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
