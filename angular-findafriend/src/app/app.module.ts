import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import {HttpClientModule} from '@angular/common/http';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupMessageComponent } from './group-message/group-message.component';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    GroupDetailComponent,
    GroupMessageComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
