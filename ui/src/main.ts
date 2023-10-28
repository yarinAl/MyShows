import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { Route, provideRouter } from '@angular/router';
import { ROUTES } from './app/app-routing';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ShowsService } from './app/services/shows.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(ROUTES),
    provideHttpClient(),
    { provide: ShowsService, useClass: ShowsService },
    importProvidersFrom(BrowserAnimationsModule)
]
})
.catch(err => console.error(err));