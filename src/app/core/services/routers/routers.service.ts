import {RouteInterface} from '../../interfaces/routers/route.interface';
import {of, Observable, delay} from 'rxjs';
import {RoutersMocksConstants} from '../../constants/routers-mocks.constants';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutersService {
  protected readonly routersMocksConstants: RouteInterface[] = RoutersMocksConstants

  private _step: number = 5;

  constructor() {}

  public getRouters(page: number = 1): Observable<RouteInterface[]> {
    const start = (page - 1) * this._step;
    const end = start + this._step;

    return of(
      this.routersMocksConstants.slice(start, end)
    ).pipe(delay(2000));
  }
}
