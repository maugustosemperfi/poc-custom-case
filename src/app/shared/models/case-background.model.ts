import { CaseComponent } from './case-compoent.model';

export interface CaseBackground extends CaseComponent {
  discriminator: 'CASEBACKGROUND';
  backgroundImgUrl: string | ArrayBuffer;
  width: number;
  height: number;
}
