import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user : any ;
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  public getMe(): Promise<any> {
       return new Promise((res, rej) => {
        this.http.get (`http://localhost:3500/api/users/me`)
      .subscribe(data =>{ 
        res(data);} , 
      data => {rej(data.ok);
      setTimeout(() => { this.router.navigate(['login']); }, 1500);

      }) 
     
    });
    }
  
  


  public updateUser(content:any): Promise<any> {
    return new Promise((res, rej) => {
      this.http.put (`http://localhost:3500/api/users/update`, {about: content})
      .subscribe(data => {
        this.user = data ;
        res(data);}) ,
        (err: any) => rej(err)
    });
  }

  public getUsers(): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get (`http://localhost:3500/api/users/`)
      .subscribe(data => {
        this.user = data ;
        res(data);}) ,
        (err: any) => rej(err)
    });
  }

   public getFollowing(id:String): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get (`http://localhost:3500/api/users/follower/${id}`)
      .subscribe(data => {
        this.user = data ;
        res(data);}) ,
        (err: any) => rej(err)
    });
  }

    public unfollow(id:String): Promise<any> {
    return new Promise((res, rej) => {
      this.http.delete (`http://localhost:3500/api/users/follower/${id}`)
      .subscribe(data => {
        this.user = data ;
        res(data);}) ,
        (err: any) => rej(err)
    });
  }


}
