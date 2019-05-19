import { CaseBackground } from 'src/app/shared/models/case-background.model';
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
