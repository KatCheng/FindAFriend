import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GroupsComponent } from './groups/groups.component';
import {HttpClientModule} from '@angular/common/http';
import { GroupDetailComponent } from './group-detail/group-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    GroupDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
