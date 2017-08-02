import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter.component';

const counterdRoutes: Routes = [
  {
    path: 'counter',
    component: CounterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(counterdRoutes)],
  exports: [RouterModule]
})
export class CounterRoutingModule {
}
