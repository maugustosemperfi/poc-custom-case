import { Component, OnInit } from '@angular/core';
import { CaseText } from 'src/app/shared/models/case-text.model';

@Component({
  selector: 'app-case-container',
  templateUrl: './case-container.component.html',
  styleUrls: ['./case-container.component.scss']
})
export class CaseContainerComponent implements OnInit {

  public caseTexts: CaseText[] = [];

  constructor() { }

  ngOnInit() {
  }

  addNewText() {
    this.caseTexts.push( {} as CaseText);
  }

}
