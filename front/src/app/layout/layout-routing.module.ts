import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PollComponent} from './poll/poll.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ReanimationComponent} from "./reanimation/reanimation.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'reanimation', component: ReanimationComponent},
  {path: 'poll', component: PollComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {

}
