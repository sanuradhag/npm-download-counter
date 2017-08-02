import { NgModule } from '@angular/core';
import { HttpInterceptor } from './http.guards';
import { GlobalDataService } from './global-data.service';
import { HttpModule } from '@angular/http';


@NgModule({
  imports: [HttpModule],
  exports: [],
  declarations: [],
  providers: [HttpInterceptor, GlobalDataService],
})
export class CoreModule {
}
