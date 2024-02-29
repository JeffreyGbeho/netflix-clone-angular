import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('JWT_TOKEN');
  if (!token) {
    return false;
  }
  return true;
};
