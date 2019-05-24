import { CaseComponent } from './case-compoent.model';

export interface CaseSticker extends CaseComponent {
  path: string;
  width: number;
  height: number;
  bWidth: number;
  bHeight: number;
}
