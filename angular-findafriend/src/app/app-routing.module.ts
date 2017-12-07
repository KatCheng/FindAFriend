import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent }      from './groups/groups.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'},
  { path: '/groups', component: GroupsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
