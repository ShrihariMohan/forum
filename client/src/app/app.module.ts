import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FeedComponent } from './feed/feed.component';
import { FormsModule } from '@angular/forms';
import {HttpRequestInterceptor} from '../app/interceptors/http-request-interceptor';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FeedComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,           
    HttpClientModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      maxOpened:1,
      closeButton:false,
        toastClass: 'toast toast-bootstrap-compatibility-fix'

    }),
  ],
  providers: [[
      { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
    ],],
  bootstrap: [AppComponent]
})
export class AppModule { }
