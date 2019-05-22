import { CaseTextSize } from '../shared/models/case-text-size.model';

export class CaseTextConstants {
  public static readonly CASE_TEXT_MAX_LENGTH = 30;
  public static readonly CASE_TEXT_DEFAULT_NAME = 'Seu nome';
  public static readonly CASE_TEXT_DEFAULT_FONT_SIZE = 16;

  public static readonly CASE_TEXT_SIZES: CaseTextSize[] = [
    {
      size: 12,
      label: 'Pequena'
    },
    {
      size: 16,
      label: 'Normal'
    },
    {
      size: 22,
      label: 'Grande'
    },
    {
      size: 28,
      label: 'Muito grande'
    }
  ];
}
