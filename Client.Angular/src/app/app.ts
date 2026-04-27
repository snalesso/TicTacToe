import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { APP_CONFIG } from '../environments/environment';
import { AppHeaderComponent } from './core/components/app-header/app-header.component';
import { ElectronService } from './core/services/electron.service';

@Component({
  selector: 'ttt-app',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [RouterOutlet, AppHeaderComponent]
})
export class AppComponent {

  readonly #electronService = inject(ElectronService);

  constructor() {
    this._logElectronInfo();
    this._registerFontAwesome();
  }

  private _logElectronInfo() {
    const electronService = this.#electronService;
    console.log('APP_CONFIG', APP_CONFIG);
    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Running in Electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  private _registerFontAwesome() {
    // DOCS: https://github.com/FortAwesome/angular-fontawesome/blob/main/docs/usage/icon-library.md
    // ICONS: https://fontawesome.com/search?ic=free-collection
    const library = inject(FaIconLibrary);
    const faConfig = inject(FaConfig);
    library.addIconPacks(fas, far);
    faConfig.fixedWidth = true;
  }
}
