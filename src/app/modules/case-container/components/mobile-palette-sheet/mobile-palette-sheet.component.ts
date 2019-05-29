import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CasePalette } from 'src/app/shared/models/case-palette.model';
import { UpdateCasePalette } from '../../store/actions/case-container.actions';
import { CaseContainerState } from '../../store/state/case-container.state';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-mobile-palette-sheet',
  templateUrl: './mobile-palette-sheet.component.html',
  styleUrls: ['./mobile-palette-sheet.component.scss']
})
export class MobilePaletteSheetComponent implements OnInit {
  public casePalette: CasePalette;

  public options: Options = {
    floor: 30,
    ceil: 100,
    hideLimitLabels: true,
    hidePointerLabels: true,
    showTicks: false,
    showTicksValues: false,
  };

  public colorPalettes = [
    '160, 234, 222',
    '76, 185, 99',
    '220, 150, 90',
    '160, 221, 255',
    '193, 206, 254',
    '169, 146, 125',
    '203, 163, 40',
    '190, 138, 96',
    '106, 46, 53',
    '195, 201, 233',
    '142, 108, 136',
    '195, 141, 148',
    '78, 47, 47',
    '254, 223, 241',
    '253, 211, 28',
    '255, 233, 176',
    '124, 201, 195',
    '242, 175, 159'
  ];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(CaseContainerState.casePalette).subscribe(casePalette => {
      this.casePalette = casePalette;
    });
  }

  public selectPalette(colorPalette: string) {
    this.casePalette.color = colorPalette;
    this.store.dispatch(new UpdateCasePalette(this.casePalette));
  }

  public opacityChanged(eventInput) {
    const opacity = eventInput.value / 100;
    this.casePalette.opacity = opacity;
    this.store.dispatch(new UpdateCasePalette(this.casePalette));
  }
}
