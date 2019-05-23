import { CaseTextSize } from '../shared/models/case-text-size.model';
import { CaseTextFont } from '../shared/models/csae-text-font.model';

export class CaseTextConstants {
  public static readonly CASE_TEXT_MAX_LENGTH = 30;
  public static readonly CASE_TEXT_DEFAULT_NAME = 'Seu nome';
  public static readonly CASE_TEXT_DEFAULT_FONT_SIZE = 16;
  public static readonly CASE_TEXT_DEFAULT_FONT = 'antharesregular';

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

  public static readonly CASE_TEXT_FONTS: CaseTextFont[] = [
    {
      labelFont: 'Anthares',
      font: 'antharesregular'
    },
    {
      labelFont: 'Belvedere Sansfreebie',
      font: 'belvederesans_freebie'
    },
    {
      labelFont: 'Belvedere Scriptfreebie',
      font: 'belvederescript_freebie'
    },
    {
      labelFont: 'Mightype Script',
      font: 'mightype_scriptregular'
    },
    {
      labelFont: 'Pristine Script',
      font: '_pristine_scriptregular'
    },
    {
      labelFont: 'Qasmi Script',
      font: 'qasmi_scriptregular'
    },
    {
      labelFont: 'Sansterdam',
      font: 'sansterdamdemo'
    }
  ];
}
