import { NgModule } from '@angular/core';
import { CounterComponent } from './counter.component';
import { CounterService } from './shared/counter.service';
import { CounterRoutingModule } from './counter.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebStorageModule } from 'ngx-store';

@NgModule({
  imports: [CommonModule, FormsModule,
    ReactiveFormsModule,
    CounterRoutingModule, WebStorageModule],
  exports: [CounterComponent],
  declarations: [CounterComponent],
  providers: [CounterService],
})
export class CounterModule {
}
