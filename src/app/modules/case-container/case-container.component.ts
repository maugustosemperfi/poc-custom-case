import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { CaseContainerState } from './store/state/case-container.state';

@Component({
  selector: 'app-case-container',
  templateUrl: './case-container.component.html',
  styleUrls: ['./case-container.component.scss']
})
export class CaseContainerComponent implements OnInit {
  @Select(CaseContainerState.caseTexts) caseTexts$: Observable<CaseText[]>;
  @Select(CaseContainerState.caseBackgrounds) caseBackgrounds$: Observable<CaseBackground[]>;

  constructor(private store: Store) {}

  ngOnInit() {}
}
