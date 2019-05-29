import { CaseComponent } from './case-compoent.model';

export interface CaseSticker extends CaseComponent {
  discriminator: 'CASESTICKER';
  path: string;
  width: number;
  height: number;
}
