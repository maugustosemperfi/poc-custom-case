import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CasePalette } from 'src/app/shared/models/case-palette.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { UpdateCaseColor } from './store/actions/case-container.actions';
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

  public casePalette: CasePalette;

  constructor(private store: Store) {}

  ngOnInit() {
    this.setInitialCaseColor();
    this.store.select(CaseContainerState.casePalette).subscribe(casePalette => (this.casePalette = casePalette));
  }

  private setInitialCaseColor() {
    this.store.dispatch(new UpdateCaseColor('255, 255, 255'));
  }
}
