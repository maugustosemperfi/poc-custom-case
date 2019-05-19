import { CaseComponent } from './case-compoent.model';

export interface CaseText extends CaseComponent {
  id: string;
  text: string;
  fontSize: number;
}
