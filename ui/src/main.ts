import { provideHttpClient } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { ROUTES } from './app/app-routing'
import { AppComponent } from './app/app.component'
import { AuthService } from './app/services/auth.service'
import { ShowsService } from './app/services/shows.service'

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(),
    { provide: ShowsService, useClass: ShowsService },
    { provide: AuthService, useClass: AuthService },
    importProvidersFrom(BrowserAnimationsModule),
  ],
}).catch((err) => console.error(err))
