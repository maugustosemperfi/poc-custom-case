import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseContainerComponent } from './modules/case-container/case-container.component';

const routes: Routes = [
  {
    path: '', component: CaseContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
