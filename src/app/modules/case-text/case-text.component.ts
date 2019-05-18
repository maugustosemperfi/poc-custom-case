import { Component, OnInit } from '@angular/core';
import { CaseText } from 'src/app/shared/models/case-text.model';

@Component({
  selector: 'app-case-text',
  templateUrl: './case-text.component.html',
  styleUrls: ['./case-text.component.scss']
})
export class CaseTextComponent implements OnInit {
  public caseText =  {} as CaseText;

  constructor() {}

  ngOnInit() {
    this.caseText.text = 'Seu nome';
  }
}
