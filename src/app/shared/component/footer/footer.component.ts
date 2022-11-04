import { Component } from '@angular/core';
import { LazyModulePreloadService } from '../../service/lazy-module-preload.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(
    private modulePreload: LazyModulePreloadService
  ) { }

    settingsModulePreload (): void {
      this.modulePreload.prefetchStart('settings')
    }
}
