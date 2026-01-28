import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access_token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // check expiration of the token
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem('access_token');
      router.navigate(['/login']);
      return false;
    }
    //check the role
    const expectedRole = route.data?.['role'];
    if (expectedRole && expectedRole !== payload.role) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }
};
