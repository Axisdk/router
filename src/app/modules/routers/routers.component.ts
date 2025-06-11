import {Component} from '@angular/core';
import {RoutersTableComponent} from './modules/routers-table/routers-table.component';

@Component({
  selector: "app-routers",
  templateUrl: "./routers.component.html",
  imports: [
    RoutersTableComponent
  ],
  styleUrl: "./routers.component.scss"
})
export class RoutersComponent {
  constructor() {}
}
