import { ProfileComponent } from './profile/profile.component';
import { FeedComponent } from './feed/feed.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'login' , component:LoginPageComponent},
    {path:'' , component: FeedComponent} , 
    {path:'profile' , component: ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
