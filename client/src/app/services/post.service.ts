
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) { }
  public getPosts(): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get (`http://localhost:3500/api/post`)
      .subscribe(data => {res(data);}) ,
        (err: any) => rej(err)
    });
  }

  public getFollowerPosts(): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get (`http://localhost:3500/api/post/follower/`)
      .subscribe(data => {res(data);}) ,
        (err: any) => rej(err)
    });
  }

  public addPost(post:String,currentUser:any): Promise<any> {
    return new Promise((res, rej) => {
      this.http.post (`http://localhost:3500/api/post`,{content:post , name:currentUser.name , picture:currentUser.picture})
      .subscribe(data => {res(data);}) ,
        (err: any) => rej(err)
    });
  }



   public addFollower(followerId:String): Promise<any> {
    return new Promise((res, rej) => {
      this.http.put (`http://localhost:3500/api/users/follower`,{followerId:followerId})
      .subscribe(data => {res(data);}) ,
        (err: any) => rej(err)
    });
  }

  public deletePost(id:String): Promise<any> {
    return new Promise((res, rej) => {
      this.http.delete (`http://localhost:3500/api/post/${id}`)
      .subscribe(data => {res(data);}) ,
        (err: any) => rej(err)
    });
  }


  
}
