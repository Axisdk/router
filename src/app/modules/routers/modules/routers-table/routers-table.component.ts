import {Component, Input, OnInit, OnDestroy, WritableSignal, signal} from '@angular/core';
import {Subject} from 'rxjs';
import {RoutersService} from '../../../../core/services/routers/routers.service';
import {RouteInterface} from '../../../../core/interfaces/routers/route.interface';
import {RouterSortEnum} from '../../../../core/enums/routers-sort.enum';
import {RouterSortInterface} from '../../../../core/interfaces/routers/router-sort.interface';
import {SortEnum} from '../../../../core/enums/sort.enum';
import {RoutersHelperService} from '../../../../core/services/routers/routers-helper.service';

@Component({
  selector: 'app-routers-table',
  templateUrl: './routers-table.component.html',
  styleUrls: ['./routers-table.component.scss']
})
export class RoutersTableComponent implements OnInit, OnDestroy {
  protected readonly routerSortEnum = RouterSortEnum;
  protected readonly sortEnum = SortEnum;
  protected readonly number = Number;

  @Input() title: string = '';

  private _destroy$: Subject<void> = new Subject<void>();
  private _page: number = 1;

  protected isLoading: WritableSignal<boolean> = signal(false);
  protected isLoadingButton: WritableSignal<boolean> = signal(false);
  protected routers: WritableSignal<RouteInterface[]> = signal([]);
  protected hasMoreRouters: WritableSignal<boolean> = signal(true);

  protected currentSort: RouterSortInterface = {
    field: undefined,
    direction: this.sortEnum.ASC
  }

  constructor(
    private _routersService: RoutersService,
    private _routersHelperService: RoutersHelperService
  ) {}

  private _getRouters(): void {

    this._routersService.getRouters(this._page).subscribe((routers: RouteInterface[]) => {
      if (!routers || !routers.length) {
        this.hasMoreRouters.set(false);
        this.isLoading.set(false);
        this.isLoadingButton.set(false);
        return;
      }

      this.routers.set([...this.routers(), ...routers]);

      if (routers.length < 5) {
        this.hasMoreRouters.set(false);
      }

      this.isLoading.set(false);
      this.isLoadingButton.set(false);
    });
  }

  private _initRouters(): void {
    this.isLoading.set(true);
    this._getRouters()
  }

  protected addCidrToAddresses(route: RouteInterface): string {
    return this._routersHelperService.addCidrToAddresses(route);
  }

  protected viewMoreRouters(): void {
    this.isLoadingButton.set(true);
    this._page++;
    this._getRouters();
  }

  protected sortRoutersBy(sortBy: RouterSortEnum): void {
    if (this.currentSort.field === sortBy) {
      this.currentSort.direction = this.currentSort.direction === this.sortEnum.ASC ? this.sortEnum.DESC : this.sortEnum.ASC;
    } else {
      this.currentSort.field = sortBy;
      this.currentSort.direction = this.sortEnum.DESC;
    }

    const direction = this.currentSort.direction === this.sortEnum.ASC ? 1 : -1;

    const sorted = [...this.routers()].sort((a, b) => {
      switch (sortBy) {
        case RouterSortEnum.UUID:
          return direction * (this.number(a.uuid) - this.number(b.uuid));
        case RouterSortEnum.ADDRESS:
          return direction * a.address.localeCompare(b.address, undefined, { numeric: true });
        case RouterSortEnum.MASK:
          return direction * a.mask.localeCompare(b.mask, undefined, { numeric: true });
        case RouterSortEnum.GATEWAY:
          return direction * a.gateway.localeCompare(b.gateway, undefined, { numeric: true });
        case RouterSortEnum.INTERFACE:
          return direction * a.interface.localeCompare(b.interface);
        default:
          return 0;
      }
    });

    this.routers.set(sorted);
  }


  ngOnInit(): void {
    this._initRouters();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
