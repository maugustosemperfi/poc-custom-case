export interface CaseComponent {
  discriminator: string;
  id: string;
  index: number;
  rotate: number;
  excluded: boolean;
  selected: boolean;
  lastX: number;
  lastY: number;
  width: number;
  height: number;
}
