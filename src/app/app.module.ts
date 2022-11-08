import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCommonModule } from './shared/component/app-common.module';
import { BrowserSupportService, BrowserSupportServiceInit } from './shared/service/browser-support.service';
import { ThemeSwitchService, ThemeSwitchServiceInit } from './shared/service/theme-switch.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppCommonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ThemeSwitchServiceInit,
      deps: [ThemeSwitchService],
      multi: true
    }, {
      provide: APP_INITIALIZER,
      useFactory: BrowserSupportServiceInit,
      deps: [BrowserSupportService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
