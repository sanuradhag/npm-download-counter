import { Injectable } from '@angular/core';
import {
  Http, RequestOptions, RequestOptionsArgs, Response, Headers, XHRBackend
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Type } from '../notification/shared/notification.model';
import { Router } from '@angular/router';
import { GlobalDataService } from './global-data.service';
import { environment } from '../../environments/environment';
@Injectable()
/**
 * Class representing the HttpInterceptor.
 */
export class HttpInterceptor extends Http {
  private apiEndPoint: string;

  constructor(private backend: XHRBackend, defaultOptions: RequestOptions,
              private globalDataService: GlobalDataService, private router: Router) {
    super(backend, defaultOptions);
    this.apiEndPoint = environment.apiUrl;
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch((this.handleError.bind(this)))
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `post` http method.
   * @param url
   * @param body
   * @param options
   * @returns {Observable<>}
   */
  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.post(this.getFullUrl(url), body, this.requestOptions(options))
      .catch((this.handleError.bind(this)))
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.put(this.getFullUrl(url), body, this.requestOptions(options))
      .catch((this.handleError.bind(this)))
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  /**
   * Performs a request with `delete` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.delete(this.getFullUrl(url), this.requestOptions(options))
      .catch((this.handleError.bind(this)))
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .finally(() => {
        this.onFinally();
      });
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      const headers = new Headers({Accept: 'application/json'});
      options.headers = headers;
    }
    return options;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    return this.apiEndPoint + url;
  }

  /**
   * Before any Request.
   */
  private beforeRequest(): void {
    this.globalDataService.showLoader();
  }

  /**
   * After any request.
   */
  private afterRequest(): void {
    this.globalDataService.hideLoader();
  }

  /**
   * onSuccess
   * @param res
   */
  private onSuccess(res: Response): void {
  }

  /**
   * onError
   * @param error
   */
  private onError(error: Response | any): void {
    if (error.status === 0) {
      const message = {
        content: 'Error occurred while connecting to the server. Please check the your internet connection',
        title: 'Network error',
        type: Type.ERROR
      };
      this.globalDataService.setNotification(message);
      return;
    }
    if (error.status === 401) {
      const message = {
        content: 'Error occurred while verifying the user. Please log in again',
        title: 'Auth token expired',
        type: Type.ERROR
      };
      this.globalDataService.setNotification(message);
      this.router.navigate(['/login']);
      return;
    }
    let errMsg: string;
    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err = body.error_description || JSON.stringify(body);
      errMsg = `${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    const message = {
      content: errMsg,
      title: 'Error',
      type: Type.ERROR
    };
    this.globalDataService.setNotification(message);
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.afterRequest();
  }
}
