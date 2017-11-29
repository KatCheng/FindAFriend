import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import {HttpClientModule} from '@angular/common/http';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupMessageComponent } from './group-message/group-message.component';


import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService } from "./authentication.service";
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing';
import { SignupComponent } from './signup/signup.component';
import { CreateGroupComponent } from './create-group/create-group.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    GroupDetailComponent,
    LoginComponent,
    HomeComponent,
    GroupMessageComponent,
    SignupComponent,
    UsersComponent,
    CreateGroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    LoadingModule,
    NgbModule.forRoot()
  ],
  providers: [
    AUTH_PROVIDERS,
    AuthGuard,
    AuthenticationService
    // ,
    // UserService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }