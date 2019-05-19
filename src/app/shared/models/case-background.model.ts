import { CaseComponent } from './case-compoent.model';

export interface CaseBackground extends CaseComponent {
  backgroundImgUrl: string | ArrayBuffer;
  width: number;
  height: number;
}
