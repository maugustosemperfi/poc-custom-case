import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { AddCaseText } from '../actions/case-container.actions';

export interface CaseContainerStateModel {
  caseTexts: CaseText[];
}

@State<CaseContainerStateModel>({
  name: 'caseContainer',
  defaults: {
    caseTexts: []
  }
})
export class CaseContainerState {
  @Selector()
  static caseTexts(state: CaseContainerStateModel) {
    return state.caseTexts;
  }

  constructor() {}

  @Action(AddCaseText)
  AddCaseText(context: StateContext<CaseContainerStateModel>, action: AddCaseText) {
    const updatedCaseTexts = context.getState().caseTexts;

    updatedCaseTexts.push(action.payload);

    context.patchState({
      caseTexts: updatedCaseTexts
    });
  }
}
