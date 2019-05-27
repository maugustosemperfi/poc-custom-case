import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as Hammer from 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CaseContainerModule } from './modules/case-container/case-container.module';
import { GestureConfig } from '@angular/material';

export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    pan: { direction: Hammer.DIRECTION_ALL },
    pinch: { enable: true }
  } as any;
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, CaseContainerModule, AppRoutingModule],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
