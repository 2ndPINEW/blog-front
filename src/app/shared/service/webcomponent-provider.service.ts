import { Injectable, Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { ThemeSwitchComponent } from "../component/theme-switch/theme-switch.component";

/**
 * AngularのコンポーネントをWebコンポーネントとして登録するサービス
 */
@Injectable({
  providedIn: "root",
})
export class WebComponentProviderService {
  constructor(private injector: Injector) {}

  private readonly components = [
    {
      name: "theme-switch",
      component: ThemeSwitchComponent,
    },
  ];

  init(): void {
    this.components.forEach((component) => {
      const el = createCustomElement(component.component, {
        injector: this.injector,
      });
      customElements.define(component.name, el);
    });
  }
}

export function WebComponentProviderServiceInit(
  webComponentProviderService: WebComponentProviderService
): Function {
  return () => webComponentProviderService.init();
}
