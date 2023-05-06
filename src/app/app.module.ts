import { HttpClient, HttpClientModule } from "@angular/common/http";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppCommonModule } from "./shared/component/app-common.module";
import {
  BrowserSupportService,
  BrowserSupportServiceInit,
} from "./shared/service/browser-support.service";
import {
  ThemeSwitchService,
  ThemeSwitchServiceInit,
} from "./shared/service/theme-switch.service";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import {
  AppInitializeService,
  AppInitializeServiceInit,
} from "./shared/service/app-initialize.service";
import {
  WebComponentProviderService,
  WebComponentProviderServiceInit,
} from "./shared/service/webcomponent-provider.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppCommonModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ThemeSwitchServiceInit,
      deps: [ThemeSwitchService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: BrowserSupportServiceInit,
      deps: [BrowserSupportService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializeServiceInit,
      deps: [AppInitializeService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: WebComponentProviderServiceInit,
      deps: [WebComponentProviderService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
