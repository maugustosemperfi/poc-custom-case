import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { Store } from '@ngxs/store';
import { CaseContainerState } from '../case-container/store/state/case-container.state';

@Component({
  selector: 'app-case-editor',
  templateUrl: './case-editor.component.html',
  styleUrls: ['./case-editor.component.scss']
})
export class CaseEditorComponent implements OnInit {

  @ViewChild('stepper') matStepper: MatStepper;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(CaseContainerState.indexStepper).subscribe(index => {
      if (index) {
        this.matStepper.selectedIndex = index;
      }
    });
  }

}
