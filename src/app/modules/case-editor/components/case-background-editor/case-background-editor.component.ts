import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-background-editor',
  templateUrl: './case-background-editor.component.html',
  styleUrls: ['./case-background-editor.component.scss']
})
export class CaseBackgroundEditorComponent implements OnInit {
  backgroundImgPath;
  backgroundImgUrl;

  constructor() {}

  ngOnInit() {}

  public selectedBackgroundFile(files) {
    if (files.length === 0) { return; }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }

    let reader = new FileReader();
    this.backgroundImgPath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.backgroundImgUrl = reader.result;
    };
  }
}
