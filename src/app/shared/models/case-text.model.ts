import { CaseComponent } from './case-compoent.model';

export interface CaseText extends CaseComponent {
  id: string;
  text: string;
  fontSize: number;
  font: string;
  fontLabel: string;
  fontIndex: number;
  color: string;
}
