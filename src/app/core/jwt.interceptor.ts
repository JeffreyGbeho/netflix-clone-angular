import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('JWT_TOKEN');
  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }
  return next(req);
};
