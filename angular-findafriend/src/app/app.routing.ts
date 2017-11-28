import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';



import { HomeComponent }   from './home/home.component';
import { GroupsComponent } from './groups/groups.component';
import {UsersComponent} from './users/users.component';
//import { GroupDetailComponent } from './group-detail/group-detail.component';
import { LoginComponent } from './login/login.component';



const appRoutes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
	//{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
	{ path: 'login', component: LoginComponent},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
	{ path: 'groups', component: GroupsComponent, canActivate: [AuthGuard]},
    //{ path: 'login', component: LoginComponent },
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

//export const routing = RouterModule.forRoot(appRoutes);