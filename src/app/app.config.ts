import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './service/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideMomentDateAdapter(),
    provideHttpClient(),
    UserService,
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      SharedModule,
      ReactiveFormsModule
    ),
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
};
