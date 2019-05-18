import { Component, Input, OnInit } from '@angular/core';
import { CaseText } from 'src/app/shared/models/case-text.model';

@Component({
  selector: 'app-case-text',
  templateUrl: './case-text.component.html',
  styleUrls: ['./case-text.component.scss']
})
export class CaseTextComponent implements OnInit {
  @Input() caseText: CaseText;

  constructor() {}

  ngOnInit() {
  }
}
