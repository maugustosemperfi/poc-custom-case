import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CaseComponentIndexConstants } from 'src/app/constants/case-components-index.constants';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import { AddCaseBackground, AddCaseText, DeleteCaseText, OrderCaseText, UpdateCaseText } from '../actions/case-container.actions';

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
    return state.caseTexts.filter(caseText => !caseText.excluded);
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

  @Action(DeleteCaseText)
  deleteCaseBackground(context: StateContext<CaseContainerStateModel>, action: DeleteCaseText) {
    const allCaseTexts = context.getState().caseTexts;

    allCaseTexts.map(caseText => {
      if (caseText.id === action.payload.id) {
        caseText.excluded = true;
      }

      return caseText;
    });

    context.patchState({
      caseTexts: allCaseTexts
    });
  }

  @Action(OrderCaseText)
  orderCaseText(context: StateContext<CaseContainerStateModel>, action: OrderCaseText) {
    const allCaseTexts = context.getState().caseTexts;

    const touchedCaseText = allCaseTexts[action.payload.previousIndex];
    const touchedCaseTextIndex = touchedCaseText.index;

    const untouchedCaseText = allCaseTexts[action.payload.newIndex];

    touchedCaseText.index = untouchedCaseText.index;
    untouchedCaseText.index = touchedCaseTextIndex;

    allCaseTexts[action.payload.previousIndex] = untouchedCaseText;
    allCaseTexts[action.payload.newIndex] = touchedCaseText;

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
