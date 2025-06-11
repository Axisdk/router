import {RouterSortEnum} from '../../enums/routers-sort.enum';
import {SortEnum} from '../../enums/sort.enum';

export interface RouterSortInterface {
  field: RouterSortEnum | undefined,
  direction: SortEnum
}
