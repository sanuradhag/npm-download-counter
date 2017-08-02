import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BusyModule } from 'angular2-busy';

import { AppComponent } from './app.component';
import { CounterModule } from './counter/conter.module';
import { NotificationComponent } from './notification/notification.component';
import { SimpleNotificationsModule } from 'angular4-notifications';
import { AppRoutes } from './app.routes';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    CounterModule,
    BrowserAnimationsModule,
    BusyModule,
    SimpleNotificationsModule.forRoot(),
    CoreModule,
    AppRoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
