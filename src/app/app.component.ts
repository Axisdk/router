import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RoutersComponent} from './modules/routers/routers.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RoutersComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
