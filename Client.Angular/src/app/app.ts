import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

  private readonly _electronService = inject(ElectronService);

  constructor() {
    const electronService = this._electronService;

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
}
