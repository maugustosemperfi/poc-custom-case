import { CaseText } from 'src/app/shared/models/case-text.model';

export class AddCaseText {
  static readonly type = '[Case Editor Container] Add Case Text';
  constructor(public readonly payload: CaseText) {}
}

export class UpdateCaseText {
  static readonly type = '[Case Editor Container] Update Case Text';
  constructor(public readonly payload: CaseText) {}
}
