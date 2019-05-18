import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { CaseContainerState } from '../modules/case-container/store/state/case-container.state';

@NgModule({
  imports: [
    NgxsModule.forRoot([
      CaseContainerState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot()
  ]
})
export class CoreModule {}
