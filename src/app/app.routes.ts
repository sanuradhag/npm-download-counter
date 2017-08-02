import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/counter', pathMatch: 'full'},
  {path: '**', component: CounterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutes {
}
