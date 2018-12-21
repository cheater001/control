// RxJS
import { Observable, of } from 'rxjs';
import { switchMap, withLatestFrom, map } from 'rxjs/operators';

// Angular
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpParams,
  HttpParameterCodec,
} from '@angular/common/http';

// State
import { Store, select } from '@ngrx/store';
import * as fromRoot from 'app/reducers';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromRoot.State>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const schemeRe = /^http[s]?:\/\//;
    const params = new HttpParams({ encoder: new CustomEncoder(), fromString: req.params.toString() });

    return of(true).pipe(
      withLatestFrom(this.store.pipe(select(fromRoot.getEndpoint))),
      map(([ _, endpoint ]) => endpoint),
      switchMap(url => {
        return next.handle(req.clone({
          url: req.url.includes(url) || schemeRe.test(req.url) ? req.url : url.concat(req.url),
          params,
        }));
      }),
    );
  }
}

class CustomEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}
