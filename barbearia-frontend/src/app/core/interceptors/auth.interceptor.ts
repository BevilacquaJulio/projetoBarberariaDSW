import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        'x-access-token': token
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};

