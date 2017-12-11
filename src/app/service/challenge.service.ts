import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Headers,
    Request
  } from '@angular/http';
import 'rxjs/add/operator/catch';
import { Challenge } from '../entities/challenge.entity';

@Injectable()
export class ChallengeService {

  constructor(private http: Http) {}

  public getAllUserData(): Observable<any> {
    return this.http
      .get('api/data.json')
      .map(res => this.extractData<Challenge[]>(res))
      .catch(this.handleError);
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json ? res.json() : null;
    return <T>(body || {});
  }

  private handleError(error: Response) {
    return Observable.throw('Error');
  }
}
