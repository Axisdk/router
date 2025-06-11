import {RouterSortEnum} from '../../enums/routers-sort.enum';
import {SortEnum} from '../../enums/sort.enum';
import {RouteInterface} from '../../interfaces/routers/route.interface';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoutersHelperService {
  protected readonly routerSortEnum = RouterSortEnum;
  protected readonly sortEnum = SortEnum;
  protected readonly number = Number;

  constructor() {}

  private _maskToCidr(mask: string): number {
    return mask
      .split('.')
      .map((octet) => parseInt(octet, 10).toString(2))
      .map((bin) => bin.padStart(8, '0'))
      .join('')
      .split('')
      .filter((bit) => bit === '1').length;
  }


  public addCidrToAddresses(route: RouteInterface): string {
    const cidr = this._maskToCidr(route.mask);
    return `${route.address}/${cidr}`;
  }
}
