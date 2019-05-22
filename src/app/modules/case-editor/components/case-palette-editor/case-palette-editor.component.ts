import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { UpdateCasePalette } from 'src/app/modules/case-container/store/actions/case-container.actions';
import { CaseContainerState } from 'src/app/modules/case-container/store/state/case-container.state';
import { CasePalette } from 'src/app/shared/models/case-palette.model';

@Component({
  selector: 'app-case-palette-editor',
  templateUrl: './case-palette-editor.component.html',
  styleUrls: ['./case-palette-editor.component.scss']
})
export class CasePaletteEditorComponent implements OnInit {
  public casePalette: CasePalette;

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
    '78, 47, 47'
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
