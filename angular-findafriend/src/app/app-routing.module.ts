import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent }      from './groups/groups.component';
import {UsersComponent} from './users/users.component';
//import { GroupDetailComponent }  from './group-detail/group-detail.component'

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full'},
  { path: 'groups', component: GroupsComponent },
  { path: 'users', component: UsersComponent },
  //{ path: 'detail/:group.title', component: GroupDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
