export interface CaseComponent {
  discriminator: string;
  id: string;
  index: number;
  rotate: number;
  excluded: boolean;
  selected: boolean;
  currentX: number;
  currentY: number;
  lastX: number;
  lastY: number;
  lastZ: number;
  currentZ: number;
  width: number;
  height: number;
  bWidth: number;
  bHeight: number;
  dragDisabled: boolean;
}
