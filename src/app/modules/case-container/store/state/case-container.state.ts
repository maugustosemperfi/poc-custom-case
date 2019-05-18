import { Action, Selector, State, StateContext } from '@ngxs/store';
import { INDEX_TEXT_MIN } from 'src/app/constants/case-components-index';
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

    if (updatedCaseTexts.length === 0) {
      action.payload.index = INDEX_TEXT_MIN;
    } else {
      action.payload.index = updatedCaseTexts.length + INDEX_TEXT_MIN;
    }

    updatedCaseTexts.push(action.payload);

    context.patchState({
      caseTexts: updatedCaseTexts
    });
  }
}
