import { CaseBackground } from 'src/app/shared/models/case-background.model';
import { CasePalette } from 'src/app/shared/models/case-palette.model';
import { CaseSticker } from 'src/app/shared/models/case-sticker.model';
import { CaseText } from 'src/app/shared/models/case-text.model';

export class AddCaseText {
  static readonly type = '[Case Editor Container] Add Case Text';
  constructor(public readonly payload: CaseText) {}
}

export class UpdateCaseText {
  static readonly type = '[Case Editor Container] Update Case Text';
  constructor(public readonly payload: CaseText) {}
}

export class DeleteCaseText {
  static readonly type = '[Case Editor Container] Delete Case Text';
  constructor(public readonly payload: CaseText) {}
}

export class OrderCaseText {
  static readonly type = '[Case Editor Container] Ordering Case Text';
  constructor(public readonly payload: { previousIndex: number; newIndex: number }) {}
}

export class AddCaseBackground {
  static readonly type = '[Case Editor Background] Add Case Background';
  constructor(public readonly payload: CaseBackground) {}
}

export class UpdateCaseBackground {
  static readonly type = '[Case Editor Background] Update Case Background';
  constructor(public readonly payload: CaseBackground) {}
}

export class DeleteCaseBackground {
  static readonly type = '[Case Editor Background] Delete Case Background';
  constructor(public readonly payload: CaseBackground) {}
}

export class UpdateCasePalette {
  static readonly type = '[Case Editor Palette] Update Case Palette';
  constructor(public readonly payload: CasePalette) {}
}

export class UpdateCaseColor {
  static readonly type = '[Case Editor Palette] Update Case Color';
  constructor(public readonly payload: string) {}
}

export class SelectCaseText {
  static readonly type = '[Case Container] Select Case Text';
  constructor(public readonly payload: CaseText) {}
}

export class SelectCaseBackground {
  static readonly type = '[Case Background] Select Case Background';
  constructor(public readonly payload: CaseBackground) {}
}

export class SelectCaseSticker {
  static readonly type = '[Case Container] Select Case Sticker';
  constructor(public readonly payload: CaseSticker) {}
}

export class AddCaseSticker {
  static readonly type = '[Case Editor Sticker] Add Case Sticker';
  constructor(public readonly payload: CaseSticker) {}
}

export class UpdateCaseSticker {
  static readonly type = '[Case Editor Sticker] Update Case Sticker';
  constructor(public readonly payload: CaseSticker) {}
}
