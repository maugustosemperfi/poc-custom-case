import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CaseComponentIndexConstants } from 'src/app/constants/case-components-index.constants';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { AddCaseBackground, AddCaseText, UpdateCaseText } from '../actions/case-container.actions';

export interface CaseContainerStateModel {
  caseBackgrounds: CaseBackground[];
  caseTexts: CaseText[];
}

@State<CaseContainerStateModel>({
  name: 'caseContainer',
  defaults: {
    caseBackgrounds: [],
    caseTexts: []
  }
})
export class CaseContainerState {
  @Selector()
  static caseTexts(state: CaseContainerStateModel) {
    return state.caseTexts;
  }

  @Selector()
  static caseBackgrounds(state: CaseContainerStateModel) {
    return state.caseBackgrounds;
  }

  constructor() {}

  @Action(AddCaseText)
  AddCaseText(context: StateContext<CaseContainerStateModel>, action: AddCaseText) {
    const updatedCaseTexts = context.getState().caseTexts;

    if (updatedCaseTexts.length === 0) {
      action.payload.index = CaseComponentIndexConstants.INDEX_TEXT_MIN;
    } else {
      action.payload.index = updatedCaseTexts.length + CaseComponentIndexConstants.INDEX_TEXT_MIN;
    }

    updatedCaseTexts.push(action.payload);

    context.patchState({
      caseTexts: updatedCaseTexts
    });
  }

  @Action(UpdateCaseText)
  UpdateCaseText(context: StateContext<CaseContainerStateModel>, action: UpdateCaseText) {
    const allCaseTexts = context.getState().caseTexts;

    allCaseTexts.map(caseText => {
      if (caseText.id === action.payload.id) {
        return action.payload;
      }

      return caseText;
    });

    context.patchState({
      caseTexts: allCaseTexts
    });
  }

  @Action(AddCaseBackground)
  addCaseBackground(context: StateContext<CaseContainerStateModel>, action: AddCaseBackground) {
    const allCaseBackgrounds = context.getState().caseBackgrounds;

    if (allCaseBackgrounds.length === 0) {
      action.payload.index = CaseComponentIndexConstants.INDEX_BACKGROUND_MIN;
    } else {
      action.payload.index = allCaseBackgrounds.length + CaseComponentIndexConstants.INDEX_BACKGROUND_MIN;
    }

    allCaseBackgrounds.push(action.payload);

    context.patchState({
      caseBackgrounds: allCaseBackgrounds
    });
  }
}
