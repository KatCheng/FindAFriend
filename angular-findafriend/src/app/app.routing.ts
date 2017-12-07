import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';



import { HomeComponent }   from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



const appRoutes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
	{ path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

//export const routing = RouterModule.forRoot(appRoutes);