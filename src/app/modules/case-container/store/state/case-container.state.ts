import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
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
  DeleteCaseSticker,
  DeleteCaseText,
  EditText,
  OrderCaseText,
  ResetCase,
  SelectCaseBackground,
  SelectCaseSticker,
  SelectCaseText,
  UpdateCaseBackground,
  UpdateCaseColor,
  UpdateCasePalette,
  UpdateCaseSticker,
  UpdateCaseText,
  UpdateSelectedComponent,
  UpdatePinchedComponent
} from '../actions/case-container.actions';

export interface CaseContainerStateModel {
  casePalette: CasePalette;
  caseBackgrounds: CaseBackground[];
  caseTexts: CaseText[];
  caseStickers: CaseSticker[];
  caseComponentSelected: CaseComponent;
  indexStepper: number;
  editedText: CaseText;
}

const emptyState: CaseContainerStateModel = {
  casePalette: {
    color: null,
    opacity: 1
  },
  caseBackgrounds: [],
  caseTexts: [],
  caseStickers: [],
  caseComponentSelected: null,
  indexStepper: null,
  editedText: null
};

@State<CaseContainerStateModel>({
  name: 'caseContainer',
  defaults: emptyState
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
    return state.caseStickers.filter(caseSticker => !caseSticker.excluded);
  }

  @Selector()
  static editedText(state: CaseContainerStateModel) {
    return state.editedText;
  }

  constructor(private store: Store) {}

  @Action(AddCaseText)
  AddCaseText(context: StateContext<CaseContainerStateModel>, action: AddCaseText) {
    const updatedCaseTexts = context.getState().caseTexts;
    const caseText = action.payload;

    caseText.width = 100;
    caseText.height = 100;
    caseText.bWidth = 100;
    caseText.bHeight = 100;
    caseText.currentX = 0;
    caseText.currentY = 0;
    caseText.currentZ = 1;
    caseText.lastX = 0;
    caseText.lastY = 0;
    caseText.lastZ = 1;
    caseText.rotate = 0;

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
    let allCaseBackgrounds = context.getState().caseBackgrounds;

    const caseBackground = action.payload;

    caseBackground.bWidth = caseBackground.width;
    caseBackground.bHeight = caseBackground.height;
    caseBackground.currentX = 0;
    caseBackground.currentY = 0;
    caseBackground.currentZ = 1;
    caseBackground.lastX = 0;
    caseBackground.lastY = 0;
    caseBackground.lastZ = 1;
    caseBackground.rotate = 0;

    allCaseBackgrounds = [];

    action.payload.index = CaseComponentIndexConstants.INDEX_BACKGROUND_MIN;

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

  @Action(UpdateCaseSticker)
  updateCaseSticker(context: StateContext<CaseContainerStateModel>, action: UpdateCaseSticker) {
    const allCaseStickers = context.getState().caseStickers;

    allCaseStickers.map(caseSticker => {
      if (caseSticker.id === action.payload.id) {
        return action.payload;
      }

      return caseSticker;
    });

    context.patchState({
      caseStickers: allCaseStickers
    });
  }

  @Action(DeleteCaseSticker)
  deleteCaseSticker(context: StateContext<CaseContainerStateModel>, action: DeleteCaseSticker) {
    const allCaseStickers = context.getState().caseStickers;

    allCaseStickers.map(caseSticker => {
      if (caseSticker.id === action.payload.id) {
        caseSticker.excluded = true;
      }

      return caseSticker;
    });

    context.patchState({
      caseStickers: allCaseStickers
    });
  }

  @Action(EditText)
  editText(context: StateContext<CaseContainerStateModel>, action: EditText) {
    context.patchState({
      editedText: action.payload
    });
  }

  @Action(ResetCase)
  resetCase(context: StateContext<CaseContainerStateModel>) {
    context.patchState({
      caseBackgrounds: [],
      caseStickers: [],
      caseTexts: [],
      caseComponentSelected: null,
      casePalette: {
        color: '255, 255, 255',
        opacity: 1
      },
      editedText: null,
      indexStepper: null
    });
  }

  @Action(UpdateSelectedComponent)
  updateSelectedComponent(context: StateContext<CaseContainerStateModel>, action: UpdateSelectedComponent) {
    if (action.payload.discriminator === 'CASESTICKER') {
      this.store.dispatch(new UpdateCaseSticker(action.payload as CaseSticker));
    } else if (action.payload.discriminator === 'CASEBACKGROUND') {
      this.store.dispatch(new UpdateCaseBackground(action.payload as CaseBackground));
    }
  }

  @Action(UpdatePinchedComponent)
  updatePinchedComponent(context: StateContext<CaseContainerStateModel>, action: UpdatePinchedComponent) {
    if (action.payload.discriminator === 'CASESTICKER') {
      this.store.dispatch(new UpdateCaseSticker(action.payload as CaseSticker));
    } else if (action.payload.discriminator === 'CASEBACKGROUND') {
      this.store.dispatch(new UpdateCaseBackground(action.payload as CaseBackground));
    }
  }
}
