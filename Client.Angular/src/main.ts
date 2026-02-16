import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app';
import { PageNotFoundComponent } from './app/core/pages/page-not-found/page-not-found';
import { GameComponent } from './app/game/pages/game/game.component';
import { APP_CONFIG } from './environments/environment';

if (APP_CONFIG.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    }),
    importProvidersFrom(),
    provideRouter([
      {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full'
      },
      {
        path: 'game',
        component: GameComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]),
    provideAppInitializer(() => {
      return inject(TranslateService).setFallbackLang('en');
    })
  ]
}).catch(console.error);
