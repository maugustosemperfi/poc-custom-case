import { CaseText } from 'src/app/shared/models/case-text.model';

export class AddCaseText {
  static readonly type = '[Case Container] Add Case Text';
  constructor(public readonly payload: CaseText) {}
}
