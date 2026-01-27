import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'recipe-app-346a5',
        appId: '1:667734149867:web:449e6986df84ed3b3f4cae',
        storageBucket: 'recipe-app-346a5.firebasestorage.app',
        apiKey: 'AIzaSyA_3Hh7hqAEzLxI0LqhfaW-4H0l9RvBBsc',
        authDomain: 'recipe-app-346a5.firebaseapp.com',
        messagingSenderId: '667734149867',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
