import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CaseComponentIndexConstants } from 'src/app/constants/case-components-index.constants';
import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CaseComponent } from 'src/app/shared/models/case-compoent.model';
import { CasePalette } from 'src/app/shared/models/case-palette.model';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseText } from 'src/app/shared/models/case-text.model';
import {
  AddCaseBackground,
  AddCaseSticker,
  AddCaseText,
  DeleteCaseBackground,
  DeleteCaseText,
  OrderCaseText,
  SelectCaseBackground,
  SelectCaseText,
  UpdateCaseBackground,
  UpdateCaseColor,
  UpdateCasePalette,
  UpdateCaseText,
  SelectCaseSticker
} from '../actions/case-container.actions';

export interface CaseContainerStateModel {
  casePalette: CasePalette;
  caseBackgrounds: CaseBackground[];
  caseTexts: CaseText[];
  caseStickers: CaseSticker[];
  caseComponentSelected: CaseComponent;
  indexStepper: number;
}

@State<CaseContainerStateModel>({
  name: 'caseContainer',
  defaults: {
    casePalette: {
      color: null,
      opacity: 1
    },
    caseBackgrounds: [],
    caseTexts: [],
    caseStickers: [],
    caseComponentSelected: null,
    indexStepper: null
  }
})
export class CaseContainerState {
  @Selector()
  static caseTexts(state: CaseContainerStateModel) {
    return state.caseTexts.filter(caseText => !caseText.excluded);
  }

  @Selector()
  static caseBackgrounds(state: CaseContainerStateModel) {
    return state.caseBackgrounds.filter(caseBackground => !caseBackground.excluded);
  }

  @Selector()
  static caseColor(state: CaseContainerStateModel) {
    return state.casePalette.color;
  }

  @Selector()
  static casePalette(state: CaseContainerStateModel) {
    return state.casePalette;
  }

  @Selector()
  static selectedCaseComponent(state: CaseContainerStateModel) {
    return state.caseComponentSelected;
  }

  @Selector()
  static indexStepper(state: CaseContainerStateModel) {
    return state.indexStepper;
  }

  @Selector()
  static caseStickers(state: CaseContainerStateModel) {
    return state.caseStickers;
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
  deleteCaseText(context: StateContext<CaseContainerStateModel>, action: DeleteCaseText) {
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

  @Action(UpdateCaseBackground)
  updateCaseBackground(context: StateContext<CaseContainerStateModel>, action: UpdateCaseBackground) {
    const allCaseBackgrounds = context.getState().caseBackgrounds;

    allCaseBackgrounds.map(caseBackground => {
      if (caseBackground.id === action.payload.id) {
        return action.payload;
      }

      return caseBackground;
    });

    context.patchState({
      caseBackgrounds: allCaseBackgrounds
    });
  }

  @Action(DeleteCaseBackground)
  deleteCaseBackground(context: StateContext<CaseContainerStateModel>, action: DeleteCaseBackground) {
    const allCaseBackgrounds = context.getState().caseBackgrounds;

    allCaseBackgrounds.map(caseBackground => {
      if (caseBackground.id === action.payload.id) {
        caseBackground.excluded = true;
      }

      return caseBackground;
    });

    context.patchState({
      caseBackgrounds: allCaseBackgrounds
    });
  }

  @Action(UpdateCasePalette)
  updateCasePalette(context: StateContext<CaseContainerStateModel>, action: UpdateCasePalette) {
    context.patchState({
      casePalette: action.payload
    });
  }

  @Action(UpdateCaseColor)
  updateCaseColor(context: StateContext<CaseContainerStateModel>, action: UpdateCaseColor) {
    const casePalette = context.getState().casePalette;

    casePalette.color = action.payload;
    context.patchState({
      casePalette
    });
  }

  @Action(SelectCaseText)
  selectCaseText(context: StateContext<CaseContainerStateModel>, action: SelectCaseText) {
    context.patchState({
      caseComponentSelected: action.payload,
      indexStepper: CaseComponentIndexConstants.CASE_TEXT_STEPPER_INDEX
    });
  }

  @Action(SelectCaseBackground)
  selectCaseBackground(context: StateContext<CaseContainerStateModel>, action: SelectCaseBackground) {
    context.patchState({
      caseComponentSelected: action.payload,
      indexStepper: CaseComponentIndexConstants.CASE_BACKGROUND_STEPPER_INDEX
    });
  }

  @Action(SelectCaseSticker)
  SelectCaseSticker(context: StateContext<CaseContainerStateModel>, action: SelectCaseSticker) {
    context.patchState({
      caseComponentSelected: action.payload,
      indexStepper: CaseComponentIndexConstants.CASE_STICKER_STEPPER_INDEX
    });
  }

  @Action(AddCaseSticker)
  addCaseSticker(context: StateContext<CaseContainerStateModel>, action: AddCaseSticker) {
    const allCaseStickers = context.getState().caseStickers;

    if (allCaseStickers.length === 0) {
      action.payload.index = CaseComponentIndexConstants.INDEX_STICKER_MIN;
    } else {
      action.payload.index = allCaseStickers.length + CaseComponentIndexConstants.INDEX_STICKER_MIN;
    }

    allCaseStickers.push(action.payload);

    context.patchState({
      caseStickers: allCaseStickers
    });
  }
}
