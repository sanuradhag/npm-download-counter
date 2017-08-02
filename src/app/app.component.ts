import { Component } from '@angular/core';
import { GlobalDataService } from './core/global-data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public busy: Subscription;

  constructor(private globalDataService: GlobalDataService) {
    this.globalDataService.getLoaderState().subscribe((show: boolean) => {
      if (show) {
        this.busy = new Subscription();
      } else {
        this.busy.unsubscribe();
      }
    });
  }
}
